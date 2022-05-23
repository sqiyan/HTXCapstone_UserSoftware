def get(control):
    step = 1.0
    movement = ""

    if control == "move forward":
        movement = "move"
    elif control == "move backward":
        movement = "move"
        step = -step
    elif control == "pan left":
        movement = "pan"
    elif control == "pan right":
        movement = "pan"
        step = -step

    return (movement, step)