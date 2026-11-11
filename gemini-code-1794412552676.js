async function generatePdfTerm(data) {
    // Carrega o PDF template original da mesma pasta
    const templateBytes = await fetch('TERMO 2026.pdf').then(res => {
        if (!res.ok) throw new Error('Não foi possível carregar o arquivo TERMO 2026.pdf. Verifique se ele está na mesma pasta.');
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFLib.PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

    const drawText = (text, x, y, size = 10, isBold = false) => {
        if (!text) return;
        firstPage.drawText(String(text), {
            x,
            y,
            size,
            font: isBold ? fontBold : font,
            color: PDFLib.rgb(0, 0, 0),
        });
    };

    const drawCheck = (x, y) => {
        firstPage.drawText('✓', {
            x: x - 1,
            y: y - 1,
            size: 11,
            font: fontBold,
            color: PDFLib.rgb(0, 0, 0),
        });
    };

    const drawHorizontalLine = (yStart) => {
        firstPage.drawLine({
            start: { x: 50, y: yStart },
            end: { x: 545, y: yStart },
            thickness: 1.5,
            color: PDFLib.rgb(0.8, 0, 0),
        });
    };

    // 1. Tipo de Atendimento
    if (data.tipoAtendimento === 'Entrega') {
        drawCheck(PDF_MAP.tipoAtendimento.entrega.x, PDF_MAP.tipoAtendimento.entrega.y);
    } else if (data.tipoAtendimento === 'Devolucao') {
        drawCheck(PDF_MAP.tipoAtendimento.devolucao.x, PDF_MAP.tipoAtendimento.devolucao.y);
    } else if (data.tipoAtendimento === 'Incidente') {
        drawCheck(PDF_MAP.tipoAtendimento.incidente.x, PDF_MAP.tipoAtendimento.incidente.y);
    }

    // 2. Dados do Chamado
    drawText(data.chamado, PDF_MAP.chamado.x, PDF_MAP.chamado.y, 9);
    drawText(data.tecnico, PDF_MAP.tecnico.x, PDF_MAP.tecnico.y, 9);
    drawText(data.data, PDF_MAP.data.x, PDF_MAP.data.y, 9);

    // 3. Dados do Colaborador
    drawText(data.colaborador.nome, PDF_MAP.colaborador.nome.x, PDF_MAP.colaborador.nome.y, 9);
    drawText(data.colaborador.contato, PDF_MAP.colaborador.contato.x, PDF_MAP.colaborador.contato.y, 9);
    drawText(data.colaborador.site, PDF_MAP.colaborador.site.x, PDF_MAP.colaborador.site.y, 9);
    drawText(data.colaborador.matricula, PDF_MAP.colaborador.matricula.x, PDF_MAP.colaborador.matricula.y, 9);
    drawText(data.colaborador.gestor, PDF_MAP.colaborador.gestor.x, PDF_MAP.colaborador.gestor.y, 9);

    // 4. Regra de Negócio: Equipamento Recolhido (Devolução ou Incidente)
    if (data.tipoAtendimento === 'Devolucao' || data.tipoAtendimento === 'Incidente') {
        data.recolhido.ativos.forEach(eq => {
            if (PDF_MAP.recolhido.equipamentos[eq]) {
                drawCheck(PDF_MAP.recolhido.equipamentos[eq].x, PDF_MAP.recolhido.equipamentos[eq].y);
            }
        });
        data.recolhido.perifericos.forEach(per => {
            if (PDF_MAP.recolhido.perifericos[per]) {
                drawCheck(PDF_MAP.recolhido.perifericos[per].x, PDF_MAP.recolhido.perifericos[per].y);
            }
        });
        drawText(data.recolhido.ativo, PDF_MAP.recolhido.campos.ativo.x, PDF_MAP.recolhido.campos.ativo.y, 9);
        drawText(data.recolhido.serviceTag, PDF_MAP.recolhido.campos.serviceTag.x, PDF_MAP.recolhido.campos.serviceTag.y, 9);
        drawText(data.recolhido.modelo, PDF_MAP.recolhido.campos.modelo.x, PDF_MAP.recolhido.campos.modelo.y, 9);
        drawText(data.recolhido.monitor, PDF_MAP.recolhido.campos.monitor.x, PDF_MAP.recolhido.campos.monitor.y, 9);
        drawText(data.recolhido.imei, PDF_MAP.recolhido.campos.imei.x, PDF_MAP.recolhido.campos.imei.y, 9);
        drawText(data.recolhido.linhaMovil, PDF_MAP.recolhido.campos.linhaMov.il.x, PDF_MAP.recolhido.campos.linhaMov.il.y, 9);

        if (data.recolhido.restauracao) drawCheck(PDF_MAP.recolhido.avaliacoes.restauracao.x, PDF_MAP.recolhido.avaliacoes.restauracao.y);
        if (data.recolhido.perfeitas) drawCheck(PDF_MAP.recolhido.avaliacoes.perfeitasCondicoes.x, PDF_MAP.recolhido.avaliacoes.perfeitasCondicoes.y);
    }

    if (data.tipoAtendimento === 'Entrega') {
        // Desenha linhas cobrindo o bloco recolhido caso seja apenas entrega
        drawHorizontalLine(585);
        drawHorizontalLine(545);
        drawHorizontalLine(505);
        drawHorizontalLine(450);
    }

    // 5. Regra de Negócio: Equipamento Entregue (Entrega ou Incidente)
    if (data.tipoAtendimento === 'Entrega' || data.tipoAtendimento === 'Incidente') {
        data.entregue.ativos.forEach(eq => {
            if (PDF_MAP.entregue.equipamentos[eq]) {
                drawCheck(PDF_MAP.entregue.equipamentos[eq].x, PDF_MAP.entregue.equipamentos[eq].y);
            }
        });
        data.entregue.perifericos.forEach(per => {
            if (PDF_MAP.entregue.perifericos[per]) {
                drawCheck(PDF_MAP.entregue.perifericos[per].x, PDF_MAP.entregue.perifericos[per].y);
            }
        });
        drawText(data.entregue.ativo, PDF_MAP.entregue.campos.ativo.x, PDF_MAP.entregue.campos.ativo.y, 9);
        drawText(data.entregue.serviceTag, PDF_MAP.entregue.campos.serviceTag.x, PDF_MAP.entregue.campos.serviceTag.y, 9);
        drawText(data.entregue.modelo, PDF_MAP.entregue.campos.modelo.x, PDF_MAP.entregue.campos.modelo.y, 9);
        drawText(data.entregue.monitor, PDF_MAP.entregue.campos.monitor.x, PDF_MAP.entregue.campos.monitor.y, 9);
        drawText(data.entregue.imei, PDF_MAP.entregue.campos.imei.x, PDF_MAP.entregue.campos.imei.y, 9);
        drawText(data.entregue.linhaMovil, PDF_MAP.entregue.campos.linhaMovil.x, PDF_MAP.entregue.campos.linhaMovil.y, 9);

        if (data.entregue.avarias === 'Sim') {
            drawCheck(PDF_MAP.entregue.avarias.sim.x, PDF_MAP.entregue.avarias.sim.y);
        } else {
            drawCheck(PDF_MAP.entregue.avarias.nao.x, PDF_MAP.entregue.avarias.nao.y);
        }
        drawText(data.entregue.observacoes, PDF_MAP.entregue.observacoes.x, PDF_MAP.entregue.observacoes.y, 8);
    }

    if (data.tipoAtendimento === 'Devolucao') {
        // Desenha linhas cobrindo o bloco entregue caso seja apenas devolução
        drawHorizontalLine(380);
        drawHorizontalLine(340);
        drawHorizontalLine(300);
        drawHorizontalLine(255);
    }

    // Salva e dispara o download do PDF preenchido
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `TERMO_${data.chamado || 'ATENDIMENTO'}_${data.colaborador.nome || 'COLABORADOR'}.pdf`.replace(/\s+/g, '_');
    link.click();
}