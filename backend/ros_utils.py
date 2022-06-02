import roslibpy


def setup_ros():
    global movement_client
    global sensors_co2_client
    global sensors_ir_client
    global sensors_mic_client
    global algo_pred_client

    ros_client = roslibpy.Ros(host='localhost', port=9090)
    ros_client.run()

    movement_client = roslibpy.Topic(ros_client, '/user_movement',
                                     'motor_controller/UserMovementCmd')
    sensors_co2_client = roslibpy.Topic(ros_client, '/sensors/co2', 'std_msgs/Float32')
    sensors_ir_client = roslibpy.Topic(ros_client, '/sensors/ir', 'std_msgs/Float32')
    sensors_mic_client = roslibpy.Topic(ros_client, '/sensors/mic', 'std_msgs/Float32')
    algo_pred_client = roslibpy.Topic(ros_client, '/algo/pred', 'std_msgs/Float32')

    return ros_client


def teardown_ros(ros_client):
    # Teardown publishers
    movement_client.unadvertise()

    # Terminate ros node
    ros_client.terminate()


def insert_value(shared_val, ins_val):
    print("Heard talking:", ins_val)
    shared_val.value = ins_val["data"]
