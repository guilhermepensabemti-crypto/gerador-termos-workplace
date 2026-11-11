const PDF_MAP = {
  // --- SERVIÇO REALIZADO (CHECKBOXES) ---
  tipoAtendimento: {
    entrega: { x: 54, y: 746, width: 10, height: 10, pagina: 0 },
    devolucao: { x: 54, y: 732, width: 10, height: 10, pagina: 0 },
    incidente: { x: 195, y: 732, width: 10, height: 10, pagina: 0 }
  },

  // --- DADOS DO CHAMADO ---
  chamado: { x: 95, y: 698, width: 100, height: 12, pagina: 0 },
  tecnico: { x: 235, y: 698, width: 150, height: 12, pagina: 0 },
  data: { x: 445, y: 698, width: 90, height: 12, pagina: 0 },

  // --- DADOS DO COLABORADOR ---
  colaborador: {
    nome: { x: 80, y: 660, width: 250, height: 12, pagina: 0 },
    contato: { x: 380, y: 660, width: 160, height: 12, pagina: 0 },
    site: { x: 80, y: 644, width: 100, height: 12, pagina: 0 },
    matricula: { x: 250, y: 644, width: 110, height: 12, pagina: 0 },
    gestor: { x: 440, y: 644, width: 100, height: 12, pagina: 0 }
  },

  // --- DADOS DO EQUIPAMENTO RECOLHIDO ---
  recolhido: {
    blocoYStart: 590, // Ponto de referência para desenhar a linha horizontal de bloqueio se necessário
    equipamentos: {
      notebookPadrao: { x: 54, y: 598, width: 8, height: 8, pagina: 0 },
      notebookAvancado: { x: 175, y: 598, width: 8, height: 8, pagina: 0 },
      notebookPlus: { x: 300, y: 598, width: 8, height: 8, pagina: 0 },
      ultrabook: { x: 54, y: 586, width: 8, height: 8, pagina: 0 },
      desktopPadrao: { x: 175, y: 586, width: 8, height: 8, pagina: 0 },
      desktopAvancado: { x: 300, y: 586, width: 8, height: 8, pagina: 0 },
      desktopPlus: { x: 430, y: 586, width: 8, height: 8, pagina: 0 },
      macbook: { x: 54, y: 574, width: 8, height: 8, pagina: 0 },
      celular: { x: 175, y: 574, width: 8, height: 8, pagina: 0 },
      ipadTablet: { x: 300, y: 574, width: 8, height: 8, pagina: 0 },
      monitor: { x: 430, y: 574, width: 8, height: 8, pagina: 0 }
    },
    perifericos: {
      adaptadorUsbc: { x: 54, y: 560, width: 8, height: 8, pagina: 0 },
      dockstation: { x: 175, y: 560, width: 8, height: 8, pagina: 0 },
      mochila: { x: 300, y: 560, width: 8, height: 8, pagina: 0 },
      teclado: { x: 430, y: 560, width: 8, height: 8, pagina: 0 },
      mouse: { x: 54, y: 548, width: 8, height: 8, pagina: 0 },
      fone: { x: 175, y: 548, width: 8, height: 8, pagina: 0 },
      cadeadoTrava: { x: 300, y: 548, width: 8, height: 8, pagina: 0 },
      outros: { x: 430, y: 548, width: 8, height: 8, pagina: 0 }
    },
    campos: {
      ativo: { x: 80, y: 520, width: 120, height: 12, pagina: 0 },
      serviceTag: { x: 280, y: 520, width: 220, height: 12, pagina: 0 },
      modelo: { x: 80, y: 504, width: 200, height: 12, pagina: 0 },
      monitor: { x: 320, y: 504, width: 180, height: 12, pagina: 0 },
      imei: { x: 100, y: 488, width: 150, height: 12, pagina: 0 },
      linhaMov.il: { x: 320, y: 488, width: 180, height: 12, pagina: 0 }
    },
    avaliacoes: {
      restauracao: { x: 54, y: 462, width: 10, height: 10, pagina: 0 },
      perfeitasCondicoes: { x: 54, y: 448, width: 10, height: 10, pagina: 0 }
    }
  },

  // --- DADOS DO EQUIPAMENTO ENTREGUE ---
  entregue: {
    blocoYStart: 385, // Ponto de referência para o bloco entregue
    equipamentos: {
      notebookPadrao: { x: 54, y: 395, width: 8, height: 8, pagina: 0 },
      notebookAvancado: { x: 175, y: 395, width: 8, height: 8, pagina: 0 },
      notebookPlus: { x: 300, y: 395, width: 8, height: 8, pagina: 0 },
      ultrabook: { x: 54, y: 382, width: 8, height: 8, pagina: 0 },
      desktopPadrao: { x: 175, y: 382, width: 8, height: 8, pagina: 0 },
      desktopAvancado: { x: 300, y: 382, width: 8, height: 8, pagina: 0 },
      desktopPlus: { x: 430, y: 382, width: 8, height: 8, pagina: 0 },
      macbook: { x: 54, y: 370, width: 8, height: 8, pagina: 0 },
      celular: { x: 175, y: 370, width: 8, height: 8, pagina: 0 },
      ipadTablet: { x: 300, y: 370, width: 8, height: 8, pagina: 0 },
      monitor: { x: 430, y: 370, width: 8, height: 8, pagina: 0 }
    },
    perifericos: {
      adaptadorUsbc: { x: 54, y: 356, width: 8, height: 8, pagina: 0 },
      dockstation: { x: 175, y: 356, width: 8, height: 8, pagina: 0 },
      mochila: { x: 300, y: 356, width: 8, height: 8, pagina: 0 },
      teclado: { x: 430, y: 356, width: 8, height: 8, pagina: 0 },
      mouse: { x: 54, y: 344, width: 8, height: 8, pagina: 0 },
      fone: { x: 175, y: 344, width: 8, height: 8, pagina: 0 },
      cadeadoTrava: { x: 300, y: 344, width: 8, height: 8, pagina: 0 },
      outros: { x: 430, y: 344, width: 8, height: 8, pagina: 0 }
    },
    campos: {
      ativo: { x: 80, y: 316, width: 120, height: 12, pagina: 0 },
      serviceTag: { x: 280, y: 316, width: 220, height: 12, pagina: 0 },
      modelo: { x: 80, y: 300, width: 200, height: 12, pagina: 0 },
      monitor: { x: 320, y: 300, width: 180, height: 12, pagina: 0 },
      imei: { x: 100, y: 284, width: 150, height: 12, pagina: 0 },
      linhaMovil: { x: 320, y: 284, width: 180, height: 12, pagina: 0 }
    },
    avarias: {
      sim: { x: 165, y: 268, width: 8, height: 8, pagina: 0 },
      nao: { x: 205, y: 268, width: 8, height: 8, pagina: 0 }
    },
    observacoes: { x: 90, y: 250, width: 420, height: 24, pagina: 0 }
  }
};