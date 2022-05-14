import torch
import matplotlib.pyplot as plt
from IPython.display import Audio, display
import torchaudio
import numpy as np
import scipy.io

def load_audio_data(file_path, start_second=None, end_second=None):
  if '.wav' in file_path:
    file_path.replace('.wav','.mat')
  metadata = torchaudio.info(file_path)
  waveform, sample_rate = torchaudio.load(file_path)
  try:
    if start_second and end_second:
      waveform = waveform[:,start_second*sample_rate:end_second*sample_rate]
    if start_second:
      waveform = waveform[:,start_second*sample_rate:]
    if end_second:
      waveform = waveform[:,:end_second*sample_rate]
  except:
    pass

  return waveform, sample_rate, metadata


def get_mat_y_labels(file_path,sample_rate, start_second=None, end_second=None):
  """Reads .mat file from file path and reshapes to 1D numpy array
   
    :param file_path: File path to mat file
    :type file_path: str, optional
    
    :return: 1D numpy array
    :rtype: numpy
  """
  try:
    if start_second and end_second:
        numpy_arr = scipy.io.loadmat(file_path)['y_label'].reshape(1,-1).flatten()[start_second*sample_rate:end_second*sample_rate]
    if start_second:
      numpy_arr = scipy.io.loadmat(file_path)['y_label'].reshape(1,-1).flatten()[start_second*sample_rate:]
    if end_second:
      numpy_arr = scipy.io.loadmat(file_path)['y_label'].reshape(1,-1).flatten()[:end_second*sample_rate]
    else:
      numpy_arr = scipy.io.loadmat(file_path)['y_label'].reshape(1,-1).flatten()
  except:
    numpy_arr = scipy.io.loadmat(file_path)['y_label'].reshape(1,-1).flatten()


  return numpy_arr

def create_activation_mask(speech_timestamp,total_num_frames):
    """takes a list or dictionary of start and end audio points and converts it to a mask for waveform plot

      {
      '0': {'start': 19488,'end': 48096} ,   =>  [0,0,0,0,0,0,1,1,1,1,1,0,0,0]
      '1': {'start': 58368,'end': 77280}
      } 

      :param speech_timestamp: Timestamps of each start and end of voice
      :type speech_timestamp: dict, list
      :param total_num_frames: Determines the length of the final mask list 
      :type total_num_frames: int

      :return: list of the mask
      :rtype: list

    """
    activation = []
    try: 
      for i in speech_timestamp:
            activation.extend([i for i in range(speech_timestamp[i]['start'],speech_timestamp[i]['end'])])
    except:
      try:
        for i in speech_timestamp:
          activation.extend([i for i in range(i['start'],i['end'])])
      except:
          raise TypeError("Only dict or list is accepted!")
    activity = np.arange(0,total_num_frames)
    # mask that returns true if the activation exists
    mask = np.in1d(activity,activation)

    return mask

def plot_waveform(waveform, sample_rate, title="Waveform", xlim=None, ylim=None, y_min = -1, y_max = 1, mask=[], validation=[]):
  """Plots waveform diagram which reveals how well the model has predicted against the ground truth

    :param waveform: Waveform data
    :type: torch.Tensor
    :param sample_rate: The rate of samples per second
    :type: int
    :param title: Name of plot, defaults to "Waveform" 
    :type : str, optional
    :param xlim: the x limit of the graph, defaults to None 
    :type : float, optional
    :param ylim: the y limit of the graph, defaults to None 
    :type : float, optional
    :param y_min: Based on the lowest point in the graph on the waveform, defaults to -1 
    :type : float, optional
    :param y_max:  Based on the highest point in the graph on the waveform, defaults to 1 
    :type : float, optional
    :param mask: list of the predicted values, defaults to [] 
    :type : list, optional
    :param validation: list of the ground truth, defaults to [] 
    :type : list, optional
  """

  waveform = waveform.numpy()

  num_channels, num_frames = waveform.shape
  time_axis = torch.arange(0, num_frames) / sample_rate

  figure, axes = plt.subplots(num_channels, 1,figsize=(25,3))
  if num_channels == 1:
    axes = [axes]
  for c in range(num_channels):
    axes[c].plot(time_axis, waveform[c], linewidth=1, label='Signal')
    axes[c].grid(True)
    if num_channels > 1:
      axes[c].set_ylabel(f'Channel {c+1}')
    if xlim:
      axes[c].set_xlim(xlim)
    if ylim:
      axes[c].set_ylim(ylim)
  figure.suptitle(title)
  if any(mask):
    for c in range(num_channels):
      # Converts true and false to false = 0, true = value
      mask = mask*y_max
      mask[mask == 0] = y_min
      axes[c].plot(time_axis, mask, color='orange', linewidth=1, label='Prediction')
  if any(validation):
    for c in range(num_channels):
      # Converts true and false to false = 0, true = value
      validation[validation > 0] = y_max + abs(y_min)
      validation = validation + y_min
      print(validation)
      # print(validation.max())
      axes[c].plot(time_axis, validation, color='red', linewidth=1, label='Validation')
  plt.show(block=False)