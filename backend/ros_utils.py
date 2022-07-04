import roslibpy


def setup_ros(app):
    ros_client = roslibpy.Ros(host='localhost', port=9090)
    ros_client.run()

    app.movement_client = roslibpy.Topic(ros_client, '/user_movement',
                                     'motor_controller/UserMovementCmd')
    app.sensors_co2_client = roslibpy.Topic(ros_client, '/sensors/co2', 'std_msgs/Float32')
    app.sensors_ir_client = roslibpy.Topic(ros_client, '/sensors/ir', 'std_msgs/Float32')
    app.sensors_mic_client = roslibpy.Topic(ros_client, '/sensors/mic', 'std_msgs/Float32')
    app.algo_pred_client = roslibpy.Topic(ros_client, '/algo/pred', 'std_msgs/Float32')

    return ros_client


def teardown_ros(app, ros_client):
    # Teardown publishers
    app.movement_client.unadvertise()

    # Terminate ros node
    ros_client.terminate()


def insert_value(shared_val, ins_val):
    print("Heard talking:", ins_val)
    shared_val.value = ins_val["data"]
