import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import nodemailer from 'nodemailer';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

// configuração do transportador 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   user: process.env.EMAIL_USER,
   pass: process.env.EMAIL_PASS 
  }
});

// função para disparar o e-mail
async function enviarProduto(emailCliente: string) {
  try {
    const mailOptions = {
      from: '"Vendas Blox Fruit" <${process.env.EMAIL_USER}>',
      to: emailCliente,
      subject: 'Seu curso chegou! Aproveite o acesso vitalício',
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Obrigado pela sua compra!</h2>
          <p>O pagamento do seu <b>Curso Blox Fruit</b> foi confirmado.</p>
          <p>Você pode acessar seu PDF clicando no botão abaixo:</p>
          <a href="LINK_DO_SEU_PDF_AQUI" style="display: inline-block; padding: 12px 25px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Baixar PDF Agora</a>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(` Email enviado para: ${emailCliente}`);
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error);
  }
}



const app = express();
app.use(cors());
app.use(express.json());


const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

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
            unit_price: 1.0, 
            currency_id: 'BRL',
          }
        ],
        back_urls: {
          success: 'http://localhost:4321/',
          failure: 'http://localhost:4321/',
          pending: 'http://localhost:4321/',
        },
      }
    });

    res.json({ url: result.init_point });
  } catch (error) {
    
    console.error('Erro detalhado do MP:', error);
    res.status(500).json({ error: 'Erro na preferência' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



//WEBHOOK pega o status e id do pagamento confere e dispara o email


app.post('/webhook', async (req, res) => {
  const { query } = req;


  if(query.type == 'payment'){
    const paymentId = String(query['data.id']);
    try {

      //consultar para saber o status real
      const payment = new Payment(client);
      const paymentDetails = await payment.get({ id: paymentId });

      const status = paymentDetails.status;
      const emailCliente = paymentDetails.payer?.email;
      console.log(`Pagamento ${paymentId} está ${status}`);

      // payment = aprovado => dispara o email
      if (status === 'approved' && emailCliente) {
        await enviarProduto(emailCliente);
      }

    } catch (error) {
      console.error('Erro ao buscar pagamento:', error);
    }
  }

  res.sendStatus(200);
});
  
 




