class GamePadState {
    constructor(buttonNum, keyCode) {
        this.buttonDown = false;
        this.buttonNum = -1;
        this.buttonTimer = 0;
        this.buttonNum = buttonNum;
        this.keyCode = keyCode;
    }
}

class KeyMappings {
    constructor() {
        this.Mapping_Left = null;
        this.Mapping_Right = null;
        this.Mapping_Up = null;
        this.Mapping_Down = null;
        this.Mapping_Action_Start = null;
        this.Mapping_Action_CUP = null;
        this.Mapping_Action_CDOWN = null;
        this.Mapping_Action_CLEFT = null;
        this.Mapping_Action_CRIGHT = null;
        this.Mapping_Action_Analog_Up = null;
        this.Mapping_Action_Analog_Down = null;
        this.Mapping_Action_Analog_Left = null;
        this.Mapping_Action_Analog_Right = null;
        this.Mapping_Action_Z = null;
        this.Mapping_Action_L = null;
        this.Mapping_Action_R = null;
        this.Mapping_Action_B = null;
        this.Mapping_Action_A = null;
        this.Mapping_Menu = null;
        this.Joy_Mapping_Left = null;
        this.Joy_Mapping_Right = null;
        this.Joy_Mapping_Up = null;
        this.Joy_Mapping_Down = null;
        this.Joy_Mapping_Action_Start = null;
        this.Joy_Mapping_Action_Z = null;
        this.Joy_Mapping_Action_L = null;
        this.Joy_Mapping_Action_R = null;
        this.Joy_Mapping_Action_B = null;
        this.Joy_Mapping_Action_A = null;
        this.Joy_Mapping_Menu = null;
        this.Joy_Mapping_Action_CLEFT = null;
        this.Joy_Mapping_Action_CRIGHT = null;
        this.Joy_Mapping_Action_CUP = null;
        this.Joy_Mapping_Action_CDOWN = null;
    }
}

class InputController {
    constructor() {
        this.gamepadButtons = [];
        this.DebugKeycodes = false;

        //for remapping
        this.KeyCodes = [];

        this.Key_Last = '';
        this.Joy_Last = null;
        this.Remap_Check = false;

        //controller 1
        this.Key_Up = false;
        this.Key_Down = false;
        this.Key_Left = false;
        this.Key_Right = false;
        this.Key_Action_Start = false;
        this.Key_Action_CUP = false;
        this.Key_Action_CDOWN = false;
        this.Key_Action_CLEFT = false;
        this.Key_Action_CRIGHT = false;
        this.Key_Action_Z = false;
        this.Key_Action_L = false;
        this.Key_Action_R = false;
        this.Key_Action_B = false;
        this.Key_Action_A = false;
        this.Key_Menu = false;
        this.VectorX = 0;
        this.VectorY = 0;
        this.ClickMouse = false;
        this.MouseMoved = false;

        //touch
        this.touchX_Start = 0;
        this.touchY_Start = 0;
        this.touch_tap_counter = 0;
        this.nippleDirection = 'none';

        this.KeyMappings = this.defaultKeymappings();

        this.setGamePadButtons();
    }



    setupMouseMode() {
        document.onkeydown = this.keyDown.bind(this);
        document.onkeyup = this.keyUp.bind(this);
        document.getElementById('canvas').addEventListener('mousemove', this.mouseMove.bind(this), false);
        document.getElementById('canvas').addEventListener('mousedown', this.mouseDown.bind(this), false);
        document.getElementById('canvas').addEventListener('mouseup', this.mouseUp.bind(this), false);
        document.getElementById('canvas').addEventListener("mousewheel", function (event) {
            if (event.deltaY > 0) {
                window["myApp"].sendKey(85);
            } else {
                window["myApp"].sendKey(84);
            }
        });
    }


    mouseMove(event) {
        this.MouseMoved = true;

        // if the osk is on we need to send the movements via sendDosControls()
        if (window["myApp"].keyboardController.visible) {
            this.VectorX = event.movementX;
            this.VectorY = event.movementY;
        }

        window["myApp"].sendMouseMovement(event.movementX, event.movementY);
    }

    mouseDown(event) {
        if (event.button == 0) {
            this.Key_Action_A = true;
        } else {
            this.Key_Action_B = true;
        }
    }

    mouseUp(event) {
        if (event.button == 0) {
            this.Key_Action_A = false;
        } else {
            this.Key_Action_B = false;
        }
    }

    isWithinRange(angle, range) {
        if (range - 5 < angle && angle < range + 5)
            return true;
        else
            return false;
    }



    defaultKeymappings() {
        // we need to map Joy_Mapping_XX -> Mapping_XX
        // which are Gamepad Button Ids -> Keycodes
        // the ones below that are strings are not sent as Keyboard Keys to CPP
        // but are still used for mapping action buttons so they need some value
        return {
            Mapping_Left: 37,
            Mapping_Right: 39,
            Mapping_Up: 38,
            Mapping_Down: 40,
            Mapping_Action_A: 'Mapping_Action_A',
            Mapping_Action_B: 'Mapping_Action_B',
            Mapping_Action_Start: 13,
            Mapping_Action_CUP: 'Mapping_Action_CUP',
            Mapping_Action_CDOWN: 'Mapping_Action_CDOWN',
            Mapping_Action_CLEFT: 'Mapping_Action_CLEFT',
            Mapping_Action_CRIGHT: 'Mapping_Action_CRIGHT',
            Mapping_Action_Analog_Up: 'Mapping_Action_Analog_Up',
            Mapping_Action_Analog_Down: 'Mapping_Action_Analog_Down',
            Mapping_Action_Analog_Left: 'Mapping_Action_Analog_Left',
            Mapping_Action_Analog_Right: 'Mapping_Action_Analog_Right',
            Mapping_Action_Z: 'Mapping_Action_Z',
            Mapping_Action_L: 'Mapping_Action_L',
            Mapping_Action_R: 'Mapping_Action_R',
            Mapping_Menu: 192,
            Joy_Mapping_Left: 14,
            Joy_Mapping_Right: 15,
            Joy_Mapping_Down: 13,
            Joy_Mapping_Up: 12,
            Joy_Mapping_Action_A: 0,
            Joy_Mapping_Action_B: 2,
            Joy_Mapping_Action_Start: 9,
            Joy_Mapping_Action_Z: 4,
            Joy_Mapping_Action_L: 6,
            Joy_Mapping_Action_R: 5,
            Joy_Mapping_Menu: 11,
            Joy_Mapping_Action_CLEFT: -1,
            Joy_Mapping_Action_CRIGHT: -1,
            Joy_Mapping_Action_CUP: -1,
            Joy_Mapping_Action_CDOWN: -1,
        };
    }

    setupGamePad() {
        window.addEventListener("gamepadconnected", this.initGamePad.bind(this));
    }

    setGamePadButtons() {
        this.gamepadButtons = [];
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Left, this.KeyMappings.Mapping_Left));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Right, this.KeyMappings.Mapping_Right));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Down, this.KeyMappings.Mapping_Down));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Up, this.KeyMappings.Mapping_Up));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Action_Start, this.KeyMappings.Mapping_Action_Start));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Action_B, this.KeyMappings.Mapping_Action_B));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Action_A, this.KeyMappings.Mapping_Action_A));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Action_L, this.KeyMappings.Mapping_Action_L));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Action_R, this.KeyMappings.Mapping_Action_R));
        this.gamepadButtons.push(new GamePadState(this.KeyMappings.Joy_Mapping_Menu, this.KeyMappings.Mapping_Menu));

    }

    initGamePad(e) {
        try {
            if (e.gamepad.buttons.length > 0) {// this.message = '<b>Gamepad Detected:</b><br>' + e.gamepad.id;
            }
        } catch (_a) { }
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
    }

    processGamepad() {

        // either mouse or joypad but not both
        if (this.MouseMoved)
            return;

        try {
            var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
            if (!gamepads)
                return;
            var gp = null;
            for (let i = 0; i < gamepads.length; i++) {
                if (gamepads[i] && gamepads[i].buttons.length > 0)
                    gp = gamepads[i];
            }
            if (gp) {
                for (let i = 0; i < gp.buttons.length; i++) {
                    if (this.DebugKeycodes) {
                        if (gp.buttons[i].pressed)
                            console.log(i);
                    }
                    if (gp.buttons[i].pressed)
                        this.Joy_Last = i;
                }

                this.gamepadButtons.forEach(button => {

                    if (gp.buttons[button.buttonNum].pressed) {
                        if (button.buttonTimer == 0) {
                            this.sendKeyDownEvent(button.keyCode);
                        }
                        button.buttonDown = true;
                        button.buttonTimer++;
                    } else if (button.buttonDown) {
                        if (!gp.buttons[button.buttonNum].pressed) {
                            button.buttonDown = false;
                            button.buttonTimer = 0;
                            this.sendKeyUpEvent(button.keyCode);
                        }
                    }
                }
                );

                //process axes
                try {
                    let horiz_axis = gp.axes[0];
                    let vertical_axis = gp.axes[1];

                    //deadzone
                    let deadZone = .15;
                    if (Math.abs(horiz_axis) < deadZone) {
                        horiz_axis = 0;
                    } else {
                        // start it at 0 minus the deadzone
                        if (horiz_axis > deadZone)
                            horiz_axis -= deadZone;
                        else
                            horiz_axis += deadZone;
                    }
                    if (Math.abs(vertical_axis) < deadZone) {
                        vertical_axis = 0;
                    } else {
                        // start it at 0 minus the deadzone
                        if (vertical_axis > deadZone)
                            vertical_axis -= deadZone;
                        else
                            vertical_axis += deadZone;
                    }

                    this.VectorX = horiz_axis * 9;
                    this.VectorY = vertical_axis * 9;

                    if (window["myApp"].keyboardController.visible) {
                        this.VectorX *= 2;
                        this.VectorY *= 2;
                    }
                } catch (error) { }

            }
        } catch (error) {
            console.log('an error', error)
        }
    }

    sendKeyDownEvent(keyCode) {
        let keyEvent = new KeyboardEvent('Gamepad Event Down', {
            key: keyCode,
            keyCode: keyCode
        });
        this.keyDown(keyEvent);
    }

    sendKeyUpEvent(keyCode) {
        let keyEvent = new KeyboardEvent('Gamepad Event Up', {
            key: keyCode,
            keyCode: keyCode
        });
        this.keyUp(keyEvent);
    }

    preventDefaultKeys(event) {
        if (event.key == 'F1' || event.key == 'F2' || event.key == 'F3' || event.key == 'F4' || event.key == 'F5' || event.key == 'F6' || event.key == 'F7' || event.key == 'F8' || event.key == 'F9' || event.key == 'F10' || event.key == 'F11' || event.key == 'F12' || event.key == 'Enter' || event.key == 'Backspace' || event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Control' || event.key == 'Alt' || event.key == 'Shift' || event.key == 'Tab' || event.key == 'Escape')
            event.preventDefault();
    }

    // only send the keycodes to the CPP code
    isNumber(value) {
        return !isNaN(value);
    }

    keyDown(event) {

        this.preventDefaultKeys(event);

        let input_controller = this;
        input_controller.Key_Last = event.key;
        if (this.isNumber(event.keyCode)) {
            input_controller.KeyCodes.push(event.keyCode);
        }
        if (input_controller.DebugKeycodes)
            console.log(event);

        //only allow gamepad to go through here
        if (!event.type.startsWith('Gamepad'))
            return;

        //player 1
        if (event.key == input_controller.KeyMappings.Mapping_Down) {
            input_controller.Key_Down = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Up) {
            input_controller.Key_Up = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Left) {
            input_controller.Key_Left = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Right) {
            input_controller.Key_Right = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_Start) {
            input_controller.Key_Action_Start = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_CUP) {
            input_controller.Key_Action_CUP = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_CDOWN) {
            input_controller.Key_Action_CDOWN = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_CLEFT) {
            input_controller.Key_Action_CLEFT = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_CRIGHT) {
            input_controller.Key_Action_CRIGHT = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_B) {
            input_controller.Key_Action_B = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_Z) {
            input_controller.Key_Action_Z = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_L) {
            input_controller.Key_Action_L = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_R) {
            input_controller.Key_Action_R = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_A) {
            input_controller.Key_Action_A = true;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Menu) {
            input_controller.Key_Menu = true;
        }
    }

    keyUp(event) {

        this.preventDefaultKeys(event);

        let input_controller = this;
        if (this.isNumber(event.keyCode)) {
            input_controller.KeyCodes = input_controller.KeyCodes.filter(item => item !== event.keyCode);
        }

        //only allow gamepad to go through here
        if (!event.type.startsWith('Gamepad'))
            return;

        //player 1
        if (event.key == input_controller.KeyMappings.Mapping_Down) {
            input_controller.Key_Down = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Up) {
            input_controller.Key_Up = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Left) {
            input_controller.Key_Left = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Right) {
            input_controller.Key_Right = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_Start) {
            input_controller.Key_Action_Start = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_CUP) {
            input_controller.Key_Action_CUP = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_CDOWN) {
            input_controller.Key_Action_CDOWN = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_CLEFT) {
            input_controller.Key_Action_CLEFT = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_CRIGHT) {
            input_controller.Key_Action_CRIGHT = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_B) {
            input_controller.Key_Action_B = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_Z) {
            input_controller.Key_Action_Z = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_L) {
            input_controller.Key_Action_L = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_R) {
            input_controller.Key_Action_R = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Action_A) {
            input_controller.Key_Action_A = false;
        }
        if (event.key == input_controller.KeyMappings.Mapping_Menu) {
            input_controller.Key_Menu = false;
        }

    }

    updateControls() {

        let mobileMode = this.manager ? true : false;
        let mobileString = '';

        if (this.Key_Up)
            mobileString += '1';
        else
            mobileString += '0';
        //UP
        if (this.Key_Down)
            mobileString += '1';
        else
            mobileString += '0';
        //DOWN
        if (this.Key_Left)
            mobileString += '1';
        else
            mobileString += '0';
        //LEFT
        if (this.Key_Right)
            mobileString += '1';
        else
            mobileString += '0';
        //RIGHT

        //we don't want to move the cursor around if the onscreen keyboard is displayed
        if (window["myApp"].keyboardController.visible) {
            mobileString = '0000';
        }

        if (mobileMode) {
            // left mouse click
            if (this.DragMouse) {
                mobileString += '1';
            } else if (this.ClickMouse) {
                mobileString += '1';
                this.ClickMouse = false;
            } else {
                if (this.Key_Action_B)
                    mobileString += '1';
                else
                    mobileString += '0';
            }

            // right mouse click
            if (this.Key_Action_A)
                mobileString += '1';
            else
                mobileString += '0';
        } else {
            if (this.Key_Action_A)
                mobileString += '1';
            else
                mobileString += '0';
            if (this.Key_Action_B)
                mobileString += '1';
            else
                mobileString += '0';
        }

        if (this.Key_Action_Start)
            mobileString += '1';
        else
            mobileString += '0';
        if (this.Key_Action_L)
            mobileString += '1';
        else
            mobileString += '0';
        if (this.Key_Action_R)
            mobileString += '1';
        else
            mobileString += '0';
        if (this.Key_Action_Z)
            mobileString += '1';
        else
            mobileString += '0';

        let xMove = this.VectorX;
        let yMove = this.VectorY;

        if (mobileMode) // mobilemode
        {
            // if we are holding DIR button don't move the mouse
            if (this.MobileStart && !window["myApp"].keyboardController.visible) {
                xMove = 0;
                yMove = 0;
            } else {
                // scale up mouse movement on mobile
                xMove *= 2;
                yMove *= 2;
            }
        } else {
            //clear values for the next frame
            this.VectorX = 0;
            this.VectorY = 0;
        }

        //R button displays osk
        if (this.Key_Action_R && this.Key_Action_R != this.rKeyLast) {
            window["myApp"].toggleOnscreenKeyboard();
        }
        this.rKeyLast = this.Key_Action_R;

        this.MouseMoved = false;

        //queue up the controls to be sent the wasm
        this.dosControls = [mobileString, xMove.toString(), yMove.toString(), this.KeyCodes];
        // console.log(this.dosControls)
    }

    //the wasm will call this function 60 times a second to grab the controls
    updateDosControls() {
        if (this.dosControls) {
            window["myApp"].sendDosControls(this.dosControls[0], this.dosControls[1], this.dosControls[2], this.dosControls[3], this.dosControls[3].length);
        }
    }
}

window["myApp"].setupInputController();