
// Utils for modifying functions

// Mirrors around x-axis
export function inverse(fn) {
    return (x) => -fn(x);
}

// translates line along y-axis
export function shift(fn, s) {
    return (x) => fn(x) + s;
}

// mirrors aorund y-axis
export function flip(fn) {
    return (x) => fn(-x);
}


// Various lines not based on svg paths

export function triangle(x) {
    if (x <= 0) {
        return x + 1;
    } else {
        return -x + 1;
    }
}

export function line(x) {
    return 1;
}

export function wave(x) {
    return Math.sin(2 * x);
}

export function halfCircle(x) {
    return Math.sqrt(1 - (x * x));
}

export function halfStar(x) {
    if (x < 0) {
        x = -x;
    }
    if (x < .42) {
        return 0.6666666 * x + 0.5;
    } else if (x < 0.625) {
        return -2 * x + 1.5;
    } else {
        return -0.666666 * x + 0.666666;
    }
}

export function halfStar2(x) {
    if (x < 0) {
        x = -x;
    }
    if (x < .375) {
        return 0.6666666 * x + 0.5;
    } else if (x < 0.625) {
        return -2 * x + 1.5;
    } else {
        return -0.666666 * x + 0.666666;
    }
}

export function halfStarOld(x) {
    if (x >= 0 && x < 0.25) {
        return x + 0.75;
    } else if (x >= 0 && x < 0.5) {
        return -3 * x + 1.75;
    } else if (x >= 0) {
        return -0.5 * x + 0.5;
    } else {
        return halfStarOld(-x);
    }
}

export function M(x) {
    if (x < 0) {
        x = -x;
    }
    if (x < 0.5) {
        return x;
    } else {
        return -x + 1;
    }
}

export function arrow(x) {
    if (x < -0.75) {
        return x + 1;
    } else if (x < 0.125) {
        return 0.25;
    } else if (x < 0.25) {
        return 2 * x;
    } else {
        return (2 / 3) - (2 / 3) * x;
    }
}

export function heartTop(x) {
    if (x < 0) {
        x += 1;
    }
    x -= 0.5;
    x *= 2;
    return Math.sqrt(1 - (x * x)) * 0.5;
}
