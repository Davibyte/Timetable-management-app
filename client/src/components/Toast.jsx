import { createContext, useContext, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 5000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const toast = {
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        info: (msg) => addToast(msg, 'info')
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map(({ id, message, type }) => (
                    <Toast key={id} message={message} type={type} onClose={() => removeToast(id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const Toast = ({ message, type, onClose }) => {
    const styles = {
        success: 'bg-mahogany_red-500 border-strawberry_red',
        error: 'bg-dark_garnet border-strawberry_red',
        info: 'bg-carbon_black border-silver'
    };

    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />
    };

    return (
        <div className={`${styles[type]} border-b-4 rounded-lg p-4 min-w-[320px] text-white_smoke flex items-start gap-3 shadow-lg transition-all duration-300`}>
            {icons[type]}
            <p className="flex-1 text-sm">{message}</p>
            <button onClick={onClose} className="hover:opacity-70 transition-opacity">
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};