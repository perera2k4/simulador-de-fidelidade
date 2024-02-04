// Variáveis globais para armazenar informações
let dataInicioGlobal, duracaoFidelidadeGlobal, tabelaSelecaoGlobal;
let valorMultiplicadoBL24, valorMultiplicadoFX24, valorMultiplicadoMOVEL24;
let valorMultiplicadoBL12, valorMultiplicadoFX12, valorMultiplicadoMOVEL12;

// Variáveis globais para armazenar informações
function calcularTempoFidelidade() {
    const elemento = document.getElementById('qntProdutos');

    // Verifica se o elemento está visível
    if (elemento.style.display === 'none') {
        // Se estiver oculto, torna-o visível
        elemento.style.display = 'block';
    }

    // Obtém informações e as armazena nas variáveis globais
    dataInicioGlobal = new Date(document.getElementById('dataInicio').value);
    duracaoFidelidadeGlobal = parseInt(document.getElementById('duracaoFidelidade').value, 10);
    tabelaSelecaoGlobal = document.getElementById('tabelaSelecao').value;

    // Verifica se o usuário selecionou todas as opções do calendário, fidelidade e o pacote
    if (isNaN(dataInicioGlobal) || !duracaoFidelidadeGlobal || duracaoFidelidadeGlobal <= 0) {
        elemento.style.display = 'none';
        alert('Por favor, insira uma data de início válida, selecione a duração da fidelidade e escolha um pacote.');
        return;
    }

    // Calcula o tempo restante da fidelidade com base na data de hoje
    const hoje = new Date();
    const dataFimFidelidade = new Date(dataInicioGlobal);
    dataFimFidelidade.setMonth(dataFimFidelidade.getMonth() + duracaoFidelidadeGlobal);

    // Verifica se a fidelidade já se encerrou
    if (dataFimFidelidade < hoje) {
        document.getElementById('resultado').innerText = 'O período de fidelidade já expirou.';
    }
    // Calcula o tempo restante da fidelidade
    else {
        // Calcula os dias restantes
        const diferencaMilissegundos = Math.abs(dataFimFidelidade - hoje);
        const diferencaDias = Math.ceil(diferencaMilissegundos / (1000 * 60 * 60 * 24));

        // Realiza a conversão em anos, meses e dias restantes de fidelidade
        const anosRestantes = Math.floor(diferencaDias / 365);
        const mesesRestantes = Math.floor((diferencaDias % 365) / 30);
        const diasRestantes = diferencaDias % 30;

        // Retorna o resultado de tempo restante
        let resultado = `Tempo de fidelidade restante: ${anosRestantes} anos, ${mesesRestantes} meses e ${diasRestantes} dias`;

        // As tabelas abaixo indicam o pró-rata referente aos meses em caso de cancelamento
        if (diasRestantes > 0) {
            resultado += ` (${(anosRestantes * 12) + mesesRestantes + 1} meses)`;
            // Calculo Fidelidade de 24 meses
            if (duracaoFidelidadeGlobal == 24) {
                // Tabela pró-rata Banda Larga com fidelidade de 24 meses
                const tabelas24mesesBL = {
                    invt: { // Tabela de multas Innovation 2.0
                        1: 33.33,
                        2: 66.67,
                        3: 100.00,
                        4: 133.33,
                        5: 166.67,
                        6: 200.00,
                        7: 233.33,
                        8: 266.67,
                        9: 300.00,
                        10: 333.33,
                        11: 366.67,
                        12: 400.00,
                        13: 433.33,
                        14: 466.67,
                        15: 500.00,
                        16: 533.33,
                        17: 566.67,
                        18: 600.00,
                        19: 633.33,
                        20: 666.67,
                        21: 700.00,
                        22: 733.33,
                        23: 766.67,
                        24: 800.00,
                        25: 800.00,
                    },
                    simp: { // Tabela de multas Simplifica & Simplifica 2.0
                        1: 12.50,
                        2: 25.00,
                        3: 37.50,
                        4: 50.00,
                        5: 62.50,
                        6: 75.00,
                        7: 87.50,
                        8: 100.00,
                        9: 112.50,
                        10: 125.00,
                        11: 137.50,
                        12: 150.00,
                        13: 162.50,
                        14: 175.00,
                        15: 187.50,
                        16: 200.00,
                        17: 212.50,
                        18: 225.00,
                        19: 237.50,
                        20: 250.00,
                        21: 262.50,
                        22: 275.00,
                        23: 287.50,
                        24: 300.00,
                        25: 300.00,
                    },
                    supe: { // Tabela de multas Super MPE
                        1: 33.33,
                        2: 66.67,
                        3: 100.00,
                        4: 133.33,
                        5: 166.67,
                        6: 200.00,
                        7: 233.33,
                        8: 266.67,
                        9: 300.00,
                        10: 333.33,
                        11: 366.67,
                        12: 400.00,
                        13: 433.33,
                        14: 466.67,
                        15: 500.00,
                        16: 533.33,
                        17: 566.67,
                        18: 600.00,
                        19: 633.33,
                        20: 666.67,
                        21: 700.00,
                        22: 733.33,
                        23: 766.67,
                        24: 800.00,
                        25: 800.00,
                    },
                    rebr: { // Tabela de multas Revolution Brasil
                        1: 40.00,
                        2: 80.00,
                        3: 120.00,
                        4: 160.00,
                        5: 200.00,
                        6: 240.00,
                        7: 280.00,
                        8: 320.00,
                        9: 360.00,
                        10: 400.00,
                        11: 440.00,
                        12: 480.00,
                        13: 520.00,
                        14: 560.00,
                        15: 600.00,
                        16: 640.00,
                        17: 680.00,
                        18: 720.00,
                        19: 760.00,
                        20: 800.00,
                        21: 840.00,
                        22: 880.00,
                        23: 920.00,
                        24: 960.00,
                        25: 960.00,
                    },
                    rees: { // Tabela de multas Revolution Especial
                        1: 20.00,
                        2: 40.00,
                        3: 60.00,
                        4: 80.00,
                        5: 100.0,
                        6: 120.0,
                        7: 140.0,
                        8: 160.0,
                        9: 180.0,
                        10: 200.0,
                        11: 220.0,
                        12: 240.0,
                        13: 260.0,
                        14: 280.0,
                        15: 300.0,
                        16: 320.0,
                        17: 340.0,
                        18: 360.0,
                        19: 380.0,
                        20: 400.0,
                        21: 420.0,
                        22: 440.0,
                        23: 460.0,
                        24: 480.0,
                        25: 480.0,
                    },
                    acel: { // Tabela de multas Acelera & Acelera 2.0
                        1: 33.33,
                        2: 66.67,
                        3: 100.00,
                        4: 133.33,
                        5: 166.67,
                        6: 200.00,
                        7: 233.33,
                        8: 266.67,
                        9: 300.00,
                        10: 333.33,
                        11: 366.67,
                        12: 400.00,
                        13: 433.33,
                        14: 466.67,
                        15: 500.00,
                        16: 533.33,
                        17: 566.67,
                        18: 600.00,
                        19: 633.33,
                        20: 666.67,
                        21: 700.00,
                        22: 733.33,
                        23: 766.67,
                        24: 800.00,
                        25: 800.00,
                    }
                }

                // Tabela pró-rata Linha Fixa com fidelidade de 24 meses
                const tabelas24mesesFX = {
                    invt: { // Tabela de multas Innovation 2.0
                        1: 6.25,
                        2: 12.50,
                        3: 18.75,
                        4: 25.00,
                        5: 31.25,
                        6: 37.50,
                        7: 43.75,
                        8: 50.00,
                        9: 56.25,
                        10: 62.50,
                        11: 68.75,
                        12: 75.00,
                        13: 81.25,
                        14: 87.50,
                        15: 93.75,
                        16: 100.00,
                        17: 106.25,
                        18: 112.50,
                        19: 118.75,
                        20: 125.00,
                        21: 131.25,
                        22: 137.50,
                        23: 143.75,
                        24: 150.00,
                    },
                    simp: { // Tabela de multas Simplifica & Simplifica 2.0
                        1: 6.25,
                        2: 12.50,
                        3: 18.75,
                        4: 25.00,
                        5: 31.25,
                        6: 37.50,
                        7: 43.75,
                        8: 50.00,
                        9: 56.25,
                        10: 62.50,
                        11: 68.75,
                        12: 75.00,
                        13: 81.25,
                        14: 87.50,
                        15: 93.75,
                        16: 100.00,
                        17: 106.25,
                        18: 112.50,
                        19: 118.75,
                        20: 125.00,
                        21: 131.25,
                        22: 137.50,
                        23: 143.75,
                        24: 150.00,
                    },
                    supe: { // Tabela de multas Super MPE
                        1: 6.25,
                        2: 12.50,
                        3: 18.75,
                        4: 25.00,
                        5: 31.25,
                        6: 37.50,
                        7: 43.75,
                        8: 50.00,
                        9: 56.25,
                        10: 62.50,
                        11: 68.75,
                        12: 75.00,
                        13: 81.25,
                        14: 87.50,
                        15: 93.75,
                        16: 100.00,
                        17: 106.25,
                        18: 112.50,
                        19: 118.75,
                        20: 125.00,
                        21: 131.25,
                        22: 137.50,
                        23: 143.75,
                        24: 150.00,
                    },
                    rebr: { // Tabela de multas Revolution Brasil
                        1: 19.57,
                        2: 39.14,
                        3: 58.71,
                        4: 78.28,
                        5: 97.85,
                        6: 117.42,
                        7: 136.99,
                        8: 156.56,
                        9: 176.13,
                        10: 195.70,
                        11: 215.27,
                        12: 234.84,
                        13: 254.41,
                        14: 273.98,
                        15: 293.55,
                        16: 313.12,
                        17: 332.69,
                        18: 352.26,
                        19: 371.83,
                        20: 391.40,
                        21: 410.97,
                        22: 430.54,
                        23: 450.11,
                        24: 469.68,
                    },
                    rees: { // Tabela de multas Revolution Especial
                        1: 19.57,
                        2: 39.14,
                        3: 58.71,
                        4: 78.28,
                        5: 97.85,
                        6: 117.42,
                        7: 136.99,
                        8: 156.56,
                        9: 176.13,
                        10: 195.70,
                        11: 215.27,
                        12: 234.84,
                        13: 254.41,
                        14: 273.98,
                        15: 293.55,
                        16: 313.12,
                        17: 332.69,
                        18: 352.26,
                        19: 371.83,
                        20: 391.40,
                        21: 410.97,
                        22: 430.54,
                        23: 450.11,
                        24: 469.68,
                    },
                    acel: { // Tabela de multas Acelera & Acelera 2.0
                        1: 6.25,
                        2: 12.50,
                        3: 18.75,
                        4: 25.00,
                        5: 31.25,
                        6: 37.50,
                        7: 43.75,
                        8: 50.00,
                        9: 56.25,
                        10: 62.50,
                        11: 68.75,
                        12: 75.00,
                        13: 81.25,
                        14: 87.50,
                        15: 93.75,
                        16: 100.00,
                        17: 106.25,
                        18: 112.50,
                        19: 118.75,
                        20: 125.00,
                        21: 131.25,
                        22: 137.50,
                        23: 143.75,
                        24: 150.00,
                    }
                }

                // Tabela pró-rata Linha Móvel com fidelidade de 24 meses
                const tabelas24mesesMOVEL = {
                    invt: { // Tabela de multas Innovation 2.0
                        1: 12.50,
                        2: 25.00,
                        3: 37.50,
                        4: 50.00,
                        5: 62.50,
                        6: 75.00,
                        7: 87.50,
                        8: 100.00,
                        9: 112.50,
                        10: 125.00,
                        11: 137.50,
                        12: 150.00,
                        13: 162.50,
                        14: 175.00,
                        15: 187.50,
                        16: 200.00,
                        17: 212.50,
                        18: 225.00,
                        19: 237.50,
                        20: 250.00,
                        21: 262.50,
                        22: 275.00,
                        23: 287.50,
                        24: 300.00,
                    },
                    simp: { // Tabela de multas Simplifica & Simplifica 2.0
                        1: 12.50,
                        2: 25.00,
                        3: 37.50,
                        4: 50.00,
                        5: 62.50,
                        6: 75.00,
                        7: 87.50,
                        8: 100.00,
                        9: 112.50,
                        10: 125.00,
                        11: 137.50,
                        12: 150.00,
                        13: 162.50,
                        14: 175.00,
                        15: 187.50,
                        16: 200.00,
                        17: 212.50,
                        18: 225.00,
                        19: 237.50,
                        20: 250.00,
                        21: 262.50,
                        22: 275.00,
                        23: 287.50,
                        24: 300.00,
                    }
                }

                // Realiza o cauculo pró-rata da Banda Larga de 24 meses
                const tabelaSelecionadaBL24 = tabelas24mesesBL[tabelaSelecaoGlobal];
                valorMultiplicadoBL24 = tabelaSelecionadaBL24[(anosRestantes * 12) + mesesRestantes + 1];

                // Realiza o cauculo pró-rata da Linha Fixa de 24 meses
                const tabelaSelecionadaFX24 = tabelas24mesesFX[tabelaSelecaoGlobal];
                valorMultiplicadoFX24 = tabelaSelecionadaFX24[(anosRestantes * 12) + mesesRestantes + 1];

                // Realiza o cauculo pró-rata da Linha Móvel de 24 meses
                const tabelaSelecionadaMOVEL24 = tabelas24mesesMOVEL[tabelaSelecaoGlobal];
                valorMultiplicadoMOVEL24 = tabelaSelecionadaMOVEL24[(anosRestantes * 12) + mesesRestantes + 1];
            };

            if (duracaoFidelidadeGlobal == 12) {
                // Tabela pró-rata Banda Larga com fidelidade de 12 meses
                const tabelas12mesesBL = {
                    invt: { // Tabela de multas Innovation 2.0
                        1: 66.67,
                        2: 133.33,
                        3: 200.00,
                        4: 266.67,
                        5: 333.33,
                        6: 400.00,
                        7: 466.67,
                        8: 533.33,
                        9: 600.00,
                        10: 666.67,
                        11: 733.33,
                        12: 800.00,
                        13: 800.00,
                    },
                    simp: { // Tabela de multas Simplifica & Simplifica 2.0
                        1: 25.00,
                        2: 50.00,
                        3: 75.00,
                        4: 100.0,
                        5: 125.0,
                        6: 150.0,
                        7: 175.0,
                        8: 200.0,
                        9: 225.0,
                        10: 250.0,
                        11: 275.0,
                        12: 300.0,
                        13: 300.0,
                    },
                    supe: { // Tabela de multas Super MPE
                        1: 66.67,
                        2: 133.33,
                        3: 200.00,
                        4: 266.67,
                        5: 333.33,
                        6: 400.00,
                        7: 466.67,
                        8: 533.33,
                        9: 600.00,
                        10: 666.67,
                        11: 733.33,
                        12: 800.00,
                        13: 800.00,
                    },
                    rebr: { // Tabela de multas Revolution Brasil
                        1: 30.00,
                        2: 60.00,
                        3: 90.00,
                        4: 120.0,
                        5: 150.0,
                        6: 180.0,
                        7: 210.0,
                        8: 240.0,
                        9: 270.0,
                        10: 300.0,
                        11: 330.0,
                        12: 360.0,
                        13: 360.0,
                    },
                    rees: { // Tabela de multas Revolution Especial
                        1: 25.00,
                        2: 50.00,
                        3: 75.00,
                        4: 100.0,
                        5: 125.0,
                        6: 150.0,
                        7: 175.0,
                        8: 200.0,
                        9: 225.0,
                        10: 250.0,
                        11: 275.0,
                        12: 300.0,
                        13: 300.0,
                    },
                    acel: { // Tabela de multas Acelera & Acelera 2.0
                        1: 66.67,
                        2: 133.33,
                        3: 200.00,
                        4: 266.67,
                        5: 333.33,
                        6: 400.00,
                        7: 466.67,
                        8: 533.33,
                        9: 600.00,
                        10: 666.67,
                        11: 733.33,
                        12: 800.00,
                        13: 800.00,
                    }
                }

                // Tabela pró-rata Linha Fixa com fidelidade de 12 meses
                const tabelas12mesesFX = {
                    invt: { // Tabela de multas Innovation 2.0
                        1: 12.50,
                        2: 25.00,
                        3: 37.50,
                        4: 50.00,
                        5: 62.50,
                        6: 75.00,
                        7: 87.50,
                        8: 100.00,
                        9: 112.50,
                        10: 125.00,
                        11: 137.50,
                        12: 150.00,
                        13: 150.00,
                    },
                    simp: { // Tabela de multas Simplifica & Simplifica 2.0
                        1: 12.50,
                        2: 25.00,
                        3: 37.50,
                        4: 50.00,
                        5: 62.50,
                        6: 75.00,
                        7: 87.50,
                        8: 100.00,
                        9: 112.50,
                        10: 125.00,
                        11: 137.50,
                        12: 150.00,
                        13: 150.00,
                    },
                    supe: { // Tabela de multas Super MPE
                        1: 12.50,
                        2: 25.00,
                        3: 37.50,
                        4: 50.00,
                        5: 62.50,
                        6: 75.00,
                        7: 87.50,
                        8: 100.00,
                        9: 112.50,
                        10: 125.00,
                        11: 137.50,
                        12: 150.00,
                        13: 150.00,
                    },
                    rebr: { // Tabela de multas Revolution Brasil
                        1: 19.57,
                        2: 39.14,
                        3: 58.71,
                        4: 78.28,
                        5: 97.85,
                        6: 117.42,
                        7: 136.99,
                        8: 156.56,
                        9: 176.13,
                        10: 195.70,
                        11: 215.27,
                        12: 234.84,
                    },
                    rees: { // Tabela de multas Revolution Especial
                        1: 19.57,
                        2: 39.14,
                        3: 58.71,
                        4: 78.28,
                        5: 97.85,
                        6: 117.42,
                        7: 136.99,
                        8: 156.56,
                        9: 176.13,
                        10: 195.70,
                        11: 215.27,
                        12: 234.84,
                    },
                    acel: { // Tabela de multas Acelera & Acelera 2.0
                        1: 12.50,
                        2: 25.00,
                        3: 37.50,
                        4: 50.00,
                        5: 62.50,
                        6: 75.00,
                        7: 87.50,
                        8: 100.00,
                        9: 112.50,
                        10: 125.00,
                        11: 137.50,
                        12: 150.00,
                        13: 150.00,
                    }
                }

                // Tabela pró-rata Linha Móvel com fidelidade de 12 meses
                const tabelas12mesesMOVEL = {
                    invt: { // Tabela de multas Innovation 2.0
                        1: 25.00,
                        2: 50.00,
                        3: 75.00,
                        4: 100.0,
                        5: 125.0,
                        6: 150.0,
                        7: 175.0,
                        8: 200.0,
                        9: 225.0,
                        10: 250.0,
                        11: 275.0,
                        12: 300.0,
                        13: 300.0,
                    },
                    simp: { // Tabela de multas Simplifica & Simplifica 2.0
                        1: 25.00,
                        2: 50.00,
                        3: 75.00,
                        4: 100.0,
                        5: 125.0,
                        6: 150.0,
                        7: 175.0,
                        8: 200.0,
                        9: 225.0,
                        10: 250.0,
                        11: 275.0,
                        12: 300.0,
                        13: 300.0,
                    }
                }

                // Realiza o cauculo pró-rata da Banda Larga de 12 meses
                const tabelaSelecionadaBL12 = tabelas12mesesBL[tabelaSelecaoGlobal];
                valorMultiplicadoBL12 = tabelaSelecionadaBL12[(anosRestantes * 12) + mesesRestantes + 1];

                // Realiza o cauculo pró-rata da Linha Fixa de 12 meses
                const tabelaSelecionadaFX12 = tabelas12mesesFX[tabelaSelecaoGlobal];
                valorMultiplicadoFX12 = tabelaSelecionadaFX12[(anosRestantes * 12) + mesesRestantes + 1];

                // Realiza o cauculo pró-rata da Linha Fixa de 12 meses
                const tabelaSelecionadaMOVEL12 = tabelas12mesesMOVEL[tabelaSelecaoGlobal];
                valorMultiplicadoMOVEL12 = tabelaSelecionadaMOVEL12[(anosRestantes * 12) + mesesRestantes + 1];
            };
        }
        resultado += '.';
        document.getElementById('resultado').innerText = resultado;
    }
}

// Verifica se o pacote tem celular vinculado (Apenas o Innovation e Simplifica possuem)
document.getElementById('tabelaSelecao').addEventListener('change', function () {
    const pacoteSelecionado = this.value;
    const quantidadeLinhasMovel = document.getElementById('tabelaMOVEL');
    const varQntTabelaMovel = document.getElementById('qntTabelaMOVEL');

    // Verifica se o pacote selecionado é 'invt' ou 'simp'
    if (pacoteSelecionado === 'invt' || pacoteSelecionado === 'simp') {
        // Se for, mostra a opção de quantidade de linhas móveis
        quantidadeLinhasMovel.style.display = 'block';
        varQntTabelaMovel.style.display = 'block';
    } else {
        // Se não for, esconde a opção de quantidade de linhas móveis
        quantidadeLinhasMovel.style.display = 'none';
        varQntTabelaMovel.style.display = 'none';
        // Como os outros pacote não tem celular, eles recebem o valor atribuido ao pró-rata de 0
        valorMultiplicadoMOVEL24 = 0;
        valorMultiplicadoMOVEL12 = 0;
    }
});

// Calcula o valor da fidelidade restante, divido em 12 ou 24 meses
function calcularTotalFidelidade() {
    // Valor da fidelidade de 12 meses
    if (duracaoFidelidadeGlobal == 24) {
        // Obtem os valores com base nas informações selecionadas pelo usuário
        const quantidadeBL24 = parseInt(document.getElementById('tabelaBL').value, 10);
        const quantidadeLinhasFIXA24 = parseInt(document.getElementById('tabelaFIXA').value, 10);
        const quantidadeLinhasMOVEL24 = parseInt(document.getElementById('tabelaMOVEL').value, 10);

        // Realizando o cálculo multiplicando pelos valores correspondentes
        const totalBL24 = quantidadeBL24 * valorMultiplicadoBL24;
        const totalFIXA24 = quantidadeLinhasFIXA24 * valorMultiplicadoFX24;
        
        // Verificando se o resultado para Linha Móvel é NaN e atribuindo 0 nesse caso
        const totalMOVEL24 = isNaN(quantidadeLinhasMOVEL24) ? 0 : quantidadeLinhasMOVEL24 * valorMultiplicadoMOVEL24;

        // Armazenando o resultado em uma variável diferente
        const totalFidelidade24 = {
            bandalarga24: totalBL24,
            linhaFixa24: totalFIXA24,
            linhaMovel24: totalMOVEL24
        };

        const totalSOMA24 = totalBL24 + totalFIXA24 + totalMOVEL24;
        // Criando elementos no HTML para exibir o resultado
        const resultadoDiv = document.createElement('div');
        resultadoDiv.innerHTML = `Em caso de cancelamento será gerado: \nBanda Larga: R$ ${totalFidelidade24.bandalarga24}, \nLinha Fixa: R$ ${totalFidelidade24.linhaFixa24}, \nLinha Móvel: R$ ${totalFidelidade24.linhaMovel24}</p><b>Total:</b> R$ ${totalSOMA24.toFixed(2)}.`;

        // Adicionando o resultado à div no documento
        document.getElementById('elementSoma').appendChild(resultadoDiv);
    }

    // Valor da fidelidade de 24 meses
    if (duracaoFidelidadeGlobal == 12) {
        // Obtem os valores com base nas informações selecionadas pelo usuário
        const quantidadeBL12 = parseInt(document.getElementById('tabelaBL').value, 10);
        const quantidadeLinhasFIXA12 = parseInt(document.getElementById('tabelaFIXA').value, 10);
        const quantidadeLinhasMOVEL12 = parseInt(document.getElementById('tabelaMOVEL').value, 10);

        // Realizando o cálculo multiplicando pelos valores correspondentes
        const totalBL12 = quantidadeBL12 * valorMultiplicadoBL12;
        const totalFIXA12 = quantidadeLinhasFIXA12 * valorMultiplicadoFX12;
        
        // Verificando se o resultado para Linha Móvel é NaN e atribuindo 0 nesse caso
        const totalMOVEL12 = isNaN(quantidadeLinhasMOVEL12) ? 0 : quantidadeLinhasMOVEL12 * valorMultiplicadoMOVEL12;

        // Armazenando o resultado em uma variável diferente
        const totalFidelidade12 = {
            bandalarga12: totalBL12,
            linhaFixa12: totalFIXA12,
            linhaMovel12: totalMOVEL12
        };

        const totalSOMA12 = totalBL12 + totalFIXA12 + totalMOVEL12;
        // Criando elementos no HTML para exibir o resultado
        const resultadoDiv = document.createElement('div');
        resultadoDiv.innerHTML = `Em caso de cancelamento será gerado: \nBanda Larga: R$ ${totalFidelidade12.bandalarga12}, \nLinha Fixa: R$ ${totalFidelidade12.linhaFixa12}, \nLinha Móvel: R$ ${totalFidelidade12.linhaMovel12}</p><b>Total:</b> R$ ${totalSOMA12.toFixed(2)}.`;

        // Adicionando o resultado à div no documento
        document.getElementById('elementSoma').appendChild(resultadoDiv);
    }
}