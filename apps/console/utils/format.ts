export function formatDate(date: Date) {
    return new Intl.DateTimeFormat("de-DE", {
        dateStyle: "medium",
    }).format(new Date(date));
}
