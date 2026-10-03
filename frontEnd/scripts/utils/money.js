export function formatCurrency(price) {
    return `₹${Math.round(Number(price)).toLocaleString('en-IN')}`;
}

export default formatCurrency;