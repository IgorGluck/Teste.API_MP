import cors from 'cors';
import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';


const app = express();
app.use(cors()); 
app.use(express.json());


const client = new MercadoPagoConfig({ accessToken: 'TEST-3398200168239644-050611-7dffa4e01f38252f1e413cfaecf8ae84-419038165' });

export const createPaymentPreference = async (courseData: { title: string, price: number }) => {
  const preference = new Preference(client);
}

  // rota chamar no fetch
app.post('/criar-pagamento', async (req, res) => {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: 'curso-blox-fruit',
            title: 'Curso Blox Fruit', 
            quantity: 1,
            unit_price: 35.90, 
            currency_id: 'BRL',
          }
        ],
        back_urls: {
          success: 'http://localhost:4321/?status=success',
          failure: 'http://localhost:4321/?status=error',
        },
        auto_return: 'approved',
      }
    });

    
    res.json({ url: result.init_point });
} 
  catch(error){
    console.error(error);
   res.status(500).json({ error: 'Erro na preferencia' });
  }
});


 // definindo a porta do servidor   
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



