export const clsx = (...args: unknown[]): string => {
    let className = "";

    for (let i = 0; i < args.length; i++) {
        const value = args[i];

        if (!value) continue;

        className += " ";
        if (typeof value === "function") {
            const str = value();
            if (Array.isArray(str)) className += clsx(...str);
            else className += clsx(str);
        } else if (typeof value === "object") {
            if (Array.isArray(value)) {
                if (!value.length) continue;
                const names = clsx(...value);
                className += names;
                break;
            } else {
                const keys = Object.entries(value);
                if (!keys.length) continue;
                let values = " ";

                for (let k = 0; k < keys.length; k++) {
                    const [key, value] = keys[k];
                    if (Boolean(value)) values += ` ${clsx(key)}`;
                }

                className += values.trim();
            }
        } else if (value && typeof value !== "boolean") {
            className += String(value);
        }
    }

    return className.trim();
};
