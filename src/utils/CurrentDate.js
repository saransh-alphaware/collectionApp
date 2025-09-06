
export const currentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-indexed
    const dd = String(today.getDate()).padStart(2, '0');

    return {
        year: yyyy,
        month: mm,
        day: dd,
        fullDate: `${yyyy}-${mm}-${dd}`,
    }
}


