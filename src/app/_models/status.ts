export class Status{
    status: number;
    nome: string;
    valor: number;
    protocolo: string;
    naoRealizado: string;
    protocolado: string;
    finalizado: string;
}
export class StatusCor{
    naoRealizado: string;
    protocolado: string;
    finalizado: string;
}
export class NaoRealizado{
    naoRealizado: string = "../../../assets/vermelho.png"
    protocolado: string = "../../../assets/branco.png"
    finalizado: string = "../../../assets/branco.png"
}
export class Protocolado{
    naoRealizado: string = "../../../assets/branco.png"
    protocolado: string = "../../../assets/amarelo.png"
    finalizado: string = "../../../assets/branco.png"
}
export class Finalizado{
    naoRealizado: string = "../../../assets/branco.png"
    protocolado: string = "../../../assets/branco.png"
    finalizado: string = "../../../assets/verde.png"
}