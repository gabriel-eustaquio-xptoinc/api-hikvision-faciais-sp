import express from 'express';
import DigestFetch from 'digest-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MAX_TENTATIVAS = 3;

const PORTAS = {
    SHAAR: {
        usuario: process.env.SP_SHAAR_USUARIO,
        senha: process.env.SP_SHAAR_SENHA,
        ip: process.env.SP_SHAAR_IP,
    },
    COPA: {
        usuario: process.env.SP_COPA_USUARIO,
        senha: process.env.SP_COPA_SENHA,
        ip: process.env.SP_COPA_IP,
    },
    BOARD: {
        usuario: process.env.SP_BOARD_USUARIO,
        senha: process.env.SP_BOARD_SENHA,
        ip: process.env.SP_BOARD_IP,
    },
    ALFOLI: {
        usuario: process.env.SP_ALFOLI_USUARIO,
        senha: process.env.SP_ALFOLI_SENHA,
        ip: process.env.SP_ALFOLI_IP,
    },
    YESHUA: {
        usuario: process.env.SP_YESHUA_USUARIO,
        senha: process.env.SP_YESHUA_SENHA,
        ip: process.env.SP_YESHUA_IP,
    },
    REUNIAO_TETELESTAI_ENTRADA_A: {
        usuario: process.env.SP_REUNIAO_TETELESTAI_ENTRADA_A_USUARIO,
        senha: process.env.SP_REUNIAO_TETELESTAI_ENTRADA_A_SENHA,
        ip: process.env.SP_REUNIAO_TETELESTAI_ENTRADA_A_IP,
    },
    REUNIAO_TETELESTAI_ENTRADA_B: {
        usuario: process.env.SP_REUNIAO_TETELESTAI_ENTRADA_B_USUARIO,
        senha: process.env.SP_REUNIAO_TETELESTAI_ENTRADA_B_SENHA,
        ip: process.env.SP_REUNIAO_TETELESTAI_ENTRADA_B_IP,
    },
    CFO: {
        usuario: process.env.SP_CFO_USUARIO,
        senha: process.env.SP_CFO_SENHA,
        ip: process.env.SP_CFO_IP,
    },
    CGH: {
        usuario: process.env.SP_CGH_USUARIO,
        senha: process.env.SP_CGH_SENHA,
        ip: process.env.SP_CGH_IP,
    },
    RUACH_HAKODESH: {
        usuario: process.env.SP_RUACH_HAKODESH_USUARIO,
        senha: process.env.SP_RUACH_HAKODESH_SENHA,
        ip: process.env.SP_RUACH_HAKODESH_IP,
    },
};

async function abrirPorta(local) {
    const config = PORTAS[local];

    if (!config) {
        throw new Error(`Local ${local} não encontrado`);
    }

    const client = new DigestFetch(
        config.usuario,
        config.senha
    );

    return client.fetch(
        `http://${config.ip}/ISAPI/AccessControl/RemoteControl/door/1`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/xml",
            },
            body: `
                <RemoteControlDoor version="2.0" xmlns="http://www.isapi.org/ver20/XMLSchema">
                    <cmd>open</cmd>
                </RemoteControlDoor>
            `,
        }
    );
}

app.post("/api/desbloquear", async (req, res) => {
    try {
        const { local } = req.body;

        if (!local) {
            return res.status(400).json({
                erro: "Local não informado",
            });
        }

        let response;

        for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
            response = await abrirPorta(local);

            if (response.status !== 401) {
                break;
            }

            console.warn(
                `Tentativa ${tentativa} falhou com 401`
            );
        }

        const texto = await response.text();

        res.status(response.status).send(texto);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            erro: error.message,
        });
    }
});

app.listen(3001, () => {
    console.log("Servidor iniciado na porta 3001");
});