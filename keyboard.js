class KeyboardController {
    constructor() {
        this.visible = false;
    }

    toggle() {
        if (typeof Module !== 'undefined' && Module._neil_toggle_onscreenkeyboard) {
            Module._neil_toggle_onscreenkeyboard();
            this.visible = !this.visible;
            console.log('Onscreen keyboard toggled:', this.visible);
        } else {
            console.warn('WASM Module or _neil_toggle_onscreenkeyboard not found.');
        }
    }
}
