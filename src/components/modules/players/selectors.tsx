export const getAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();

    let m = today.getMonth() - birthDate.getMonth();
    const d = today.getDay() - birthDate.getDay();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if ( age === 0 ) {
        m = 12 + m;
        if (d < 0 || (d === 0 && today.getDate() < birthDate.getDate())) {
            m--;
        }
    }

    return age ? age + " г." : m + "м";
};