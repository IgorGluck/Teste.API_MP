import { useState } from 'react';
import { styles } from '../../styles/components';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 1500);
  };

  return (
    <button 
      onClick={handlePayment} 
      disabled={loading}
      className={`${styles.button.base} ${loading ? styles.button.loading : ''}`}
    >
      {loading ? (
        <span>Processando...</span>
      ) : (
        <span>Quero acesso vitalício por R$ 35,90</span>
      )}
    </button>
  );
}