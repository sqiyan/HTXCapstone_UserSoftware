def get(control):
    step = 5.0
    movement = ""

    if control == "move forward":
        movement = "move"
    elif control == "move backward":
        movement = "move"
        step = -step
    elif control == "pan left":
        movement = "pan"
        step = -step
    elif control == "pan right":
        movement = "pan"
    elif control == "home srm":
        movement = "home_srm"
        step = True

    return (movement, step)