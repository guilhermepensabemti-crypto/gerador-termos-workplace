let currentStep = 1;
const totalSteps = 6;

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
}

function nextStep() {
    if (!validateStep(currentStep)) return;
    if (currentStep < totalSteps) {
        currentStep++;
        if (currentStep === 5) {
            applyBusinessRules();
        }
        if (currentStep === 6) {
            buildResumo();
        }
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function validateStep(step) {
    const currentSection = document.getElementById(`step-${step}`);
    const inputs = currentSection.querySelectorAll('input[required], select[required], textarea[required]');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert('Por favor, preencha todos os campos obrigatórios antes de continuar.');
            input.focus();
            return false;
        }
    }
    if (step === 1) {
        const selectedType = document.querySelector('input[name="tipoAtendimento"]:checked');
        if (!selectedType) {
            alert('Selecione o tipo de atendimento.');
            return false;
        }
    }
    return true;
}

function applyBusinessRules() {
    const tipo = document.querySelector('input[name="tipoAtendimento"]:checked').value;
    const fieldsetEntregue = document.getElementById('fieldset-entregue');
    const fieldsetRecolhido = document.getElementById('fieldset-recolhido');

    // Reset states
    fieldsetEntregue.classList.remove('disabled-section');
    fieldsetRecolhido.classList.remove('disabled-section');
    toggleInputs(fieldsetEntregue, false);
    toggleInputs(fieldsetRecolhido, false);

    if (tipo === 'Entrega') {
        fieldsetRecolhido.classList.add('disabled-section');
        toggleInputs(fieldsetRecolhido, true);
    } else if (tipo === 'Devolucao') {
        fieldsetEntregue.classList.add('disabled-section');
        toggleInputs(fieldsetEntregue, true);
    }
}

function toggleInputs(fieldset, disable) {
    const inputs = fieldset.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.disabled = disable;
    });
}

function buildResumo() {
    const tipo = document.querySelector('input[name="tipoAtendimento"]:checked')?.value || '';
    const chamado = document.getElementById('chamado').value;
    const tecnico = document.getElementById('tecnico').value;
    const data = document.getElementById('data').value;
    const nome = document.getElementById('colabNome').value;
    const contato = document.getElementById('colabContato').value;
    const site = document.getElementById('colabSite').value;
    const matricula = document.getElementById('colabMatricula').value;
    const gestor = document.getElementById('colabGestor').value;

    let html = `<strong>Tipo de Atendimento:</strong> ${tipo}<br>`;
    html += `<strong>Chamado:</strong> ${chamado} | <strong>Técnico:</strong> ${tecnico} | <strong>Data:</strong> ${data}<br>`;
    html += `<strong>Colaborador:</strong> ${nome} (${matricula}) - Contato: ${contato} - Site: ${site} - Gestor: ${gestor}<br><hr style="margin: 10px 0;">`;

    if (tipo !== 'Devolucao') {
        html += `<strong>[Equipamento Entregue]</strong><br>`;
        const entregueAtivo = document.getElementById('entregueAtivo').value;
        if (entregueAtivo) html += `Ativo: ${entregueAtivo}<br>`;
    }

    if (tipo !== 'Entrega') {
        html += `<strong>[Equipamento Recolhido]</strong><br>`;
        const recolhidoAtivo = document.getElementById('recolhidoAtivo').value;
        if (recolhidoAtivo) html += `Ativo: ${recolhidoAtivo}<br>`;
    }

    document.getElementById('resumoConteudo').innerHTML = html;
}

document.getElementById('btnGerarPdf').addEventListener('click', async () => {
    try {
        const formData = collectFormData();
        await generatePdfTerm(formData);
    } catch (error) {
        console.error(error);
        alert('Erro ao gerar o PDF: ' + error.message);
    }
});

function collectFormData() {
    const tipo = document.querySelector('input[name="tipoAtendimento"]:checked').value;
    
    const getCheckedValues = (name) => {
        const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checked).map(el => el.value);
    };

    return {
        tipoAtendimento: tipo,
        chamado: document.getElementById('chamado').value,
        tecnico: document.getElementById('tecnico').value,
        data: document.getElementById('data').value,
        colaborador: {
            nome: document.getElementById('colabNome').value,
            contato: document.getElementById('colabContato').value,
            site: document.getElementById('colabSite').value,
            matricula: document.getElementById('colabMatricula').value,
            gestor: document.getElementById('colabGestor').value
        },
        entregue: {
            ativos: getCheckedValues('entregueEq'),
            perifericos: getCheckedValues('entreguePer'),
            ativo: document.getElementById('entregueAtivo').value,
            serviceTag: document.getElementById('entregueServiceTag').value,
            modelo: document.getElementById('entregueModelo').value,
            monitor: document.getElementById('entregueMonitor').value,
            imei: document.getElementById('entregueImei').value,
            linhaMovil: document.getElementById('entregueLinha').value,
            avarias: document.querySelector('input[name="entregueAvarias"]:checked')?.value || 'Nao',
            observacoes: document.getElementById('entregueObs').value
        },
        recolhido: {
            ativos: getCheckedValues('recolhidoEq'),
            perifericos: getCheckedValues('recolhidoPer'),
            ativo: document.getElementById('recolhidoAtivo').value,
            serviceTag: document.getElementById('recolhidoServiceTag').value,
            modelo: document.getElementById('recolhidoModelo').value,
            monitor: document.getElementById('recolhidoMonitor').value,
            imei: document.getElementById('recolhidoImei').value,
            linhaMovil: document.getElementById('recolhidoLinha').value,
            restauracao: document.querySelector('input[name="recolhidoRestauracao"]:checked') ? true : false,
            perfeitas: document.querySelector('input[name="recolhidoPerfeitas"]:checked') ? true : false
        }
    };
}