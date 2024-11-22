import ipRegex from 'ip-regex';

export const updateObject = (updatedObj, updatedProps) => {
    return {
        ...updatedObj, ...updatedProps
    }
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
const validateIp = (ip) => {
    return (ipRegex({exact: true}).test(ip))
};

export const checkValidity = (value, rules, extraValues = {}) => {
    let isValid = true;
    let validationArr = [];
    if (rules && typeof rules.repeatPass !== "undefined" && rules.repeatPass) {
        isValid = (value === extraValues.password) && isValid;
        if (!isValid) {
            validationArr.push(' not match');
        }
    }
    if (rules && typeof rules.required !== "undefined" && rules.required) {
        isValid = value.trim() !== "" && isValid;
        if (!isValid) {
            validationArr.push('is required');
        }
    }
    if (rules && rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
        if (!isValid) {
            validationArr.push('maxLength should be ' + rules.maxLength);
        }
    }
    if (rules && rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
        validationArr.push('minLength should be ' + rules.minLength);
    }
    if (rules && rules.length) {
        isValid = value.trim().length == rules.length && isValid;
        validationArr.push('length should be ' + rules.length);
    }
    if (rules && rules.isEmail) {
        isValid = validateEmail(value.trim()) !== null && isValid;
        validationArr.push('Not Valid');
    }
    if (rules && rules.isIp) {
        isValid = validateIp(value.trim()) && isValid;
        validationArr.push('IP Not Valid');
    }
    return {isValid: isValid, validationArr: validationArr};
};

export const mkRandom = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const inputChangeHandler = (event, ctrlName, updateForm, newInputValue = null, eleType = null) => {
    let extraValues = {};
    if (ctrlName === 'password_confirmation') {
        extraValues = {password: updateForm.password.value}
    }

    const _val = eleType === "select" || eleType === "multible_select" ? newInputValue : event.target.value;
    const updatedControl = updateObject(updateForm[ctrlName], {
        isValid: checkValidity(_val, updateForm[ctrlName].validation, extraValues).isValid, value: _val, touched: true
    });
    updatedControl['validationErr'] = !updatedControl.isValid ? updateForm[ctrlName].label + " " + checkValidity(_val, updateForm[ctrlName].validation, extraValues).validationArr.join(" and " + updateForm[ctrlName].label + " ") : ""
    if (event.target.type === "checkbox" && event.target.className.includes("MuiSwitch-input")) {
        updatedControl['value'] = event.target.checked;
    }
    const updatedControls = updateObject(updateForm, {[ctrlName]: updatedControl});
    let isFormValid = true;
    for (let key in updatedControls) {
        isFormValid = isFormValid && updatedControls[key].isValid;
    }

    return {updatedControls: updatedControls, isFormValid: isFormValid};
    // setUpdated(updatedControls);
    // this.setState({
    //     controls: updatedControls,
    //     isFormValid: isFormValid
    // })
};