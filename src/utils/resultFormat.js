const TYPE = {
    error: "error",
    warning: "warning",
    notification: "notification",
    success: "success",
};

const trim = cadena => {
    return (cadena || "").replace(/^\s+|\s+$/gm, "");
};

const resultFormat = (type, message, data) => {
    switch (type) {
        case TYPE.error:
            return { type, message, error: data };
        case TYPE.warning:
            return { type, message, data };
        case TYPE.notification:
            return { type, message, data };
        case TYPE.success:
            return { type, message, data };
        default:
            return { type, message, error: data };
    }
};

const parseError = error => {
    const { message } = new Error(error);
    let err = message.split("\n", 1);
    let tipo = "";
    let mensaje = "";
    err = err[0].split(":", 3);
    tipo = trim(err[0]);
    if (tipo.toUpperCase() === "ERROR") {
        tipo = "Error";
    }
    mensaje = `${trim(err[1])}.${trim(err[2])}`;
    return resultFormat(TYPE.error, mensaje, { tipo, ...error });
};

export { TYPE, resultFormat, parseError };
