export default function ErrorMessage({ message }) {
    if (!message) return null;
    return (
        <div className="text-center p-8 text-red-500 bg-red-50 rounded-lg border border-red-100">
            {message}
        </div>
    );
}
