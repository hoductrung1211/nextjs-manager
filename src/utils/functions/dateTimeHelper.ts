export function getVNLocaleDateString(date: string) {
    return new Date(date)
        .toLocaleDateString("vi-VN",
            {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });
}

export function getVNLocaleDateTimeString(date: string) {
    return new Date(date)
        .toLocaleDateString("vi-VN",
            {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            });
}

export function getStandardVNLocaleDateString(date: string) {
    return new Date(date)
        .toLocaleDateString("vi-VN",
            {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });
}

export function countAge(dateOfBirth: string) {
    const nowYear = new Date().getFullYear();
    const birthYear = new Date(dateOfBirth).getFullYear();

    return nowYear - birthYear;
}