import { useState } from 'react';
import { styles } from '../../styles/components';

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/criar-pagamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('erro ao conectar ao server de pagamento');
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('nao foi possivel redirecionar para o link de pagamento');
        setLoading(false);
      }
    } catch (error) {
      console.error('erro checkout', error);
      alert('erro no pagamento');
      setLoading(false);
    }
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