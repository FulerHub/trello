export function getTimeAgoText(date: number): string {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date) / 1000);
    if (diff < 60) {
        return `${diff} second${diff === 1 ? '' : 's'} ago`;
    } else if (diff < 60 * 60) {
        const minutes = Math.floor(diff / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (diff < 60 * 60 * 24) {
        const hours = Math.floor(diff / (60 * 60));
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
        const days = Math.floor(diff / (60 * 60 * 24));
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }
}