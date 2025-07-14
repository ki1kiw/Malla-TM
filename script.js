
const cursos = [
    { id: "morfo1", nombre: "Morfofunción I", abre: ["morfo2"] },
    { id: "mate", nombre: "Matemáticas y Biofísica Aplicadas", abre: ["quimica"] },
    { id: "biocel", nombre: "Biología Celular y Genética", abre: ["morfo2"] },
    { id: "comunicacion", nombre: "Comunicación y Herramientas" },
    { id: "etica", nombre: "Orientación y Ética Profesional" },
    { id: "morfo2", nombre: "Morfofunción II", abre: ["fisiopato"] },
    { id: "quimica", nombre: "Química General y Orgánica", abre: ["fisiopato", "bioquimica"] },
    { id: "ingles1", nombre: "Inglés I", abre: ["ingles2"] },
    { id: "cfg1", nombre: "CFG 1" },
    { id: "cfg2", nombre: "CFG 2" },
    { id: "fisiopato", nombre: "Fisiopatología y Farmacología", abre: ["inmunobasica", "bioseguridad"] },
    { id: "bioquimica", nombre: "Bioquímica", abre: ["bioseguridad"] },
    { id: "ingles2", nombre: "Inglés II", abre: ["ingles3"] },
    { id: "cfg3", nombre: "CFG 3" },
    { id: "cfg4", nombre: "CFG 4" },
    { id: "inmunobasica", nombre: "Inmunología Básica", abre: ["bioqclinica1"] },
    { id: "bioseguridad", nombre: "Bioseguridad y Enfermería", abre: ["hematoclinica1", "bioqclinica1", "saludpublica"] },
    { id: "labclinico", nombre: "Métodos de Laboratorio Clínico", abre: ["hematoclinica1", "bioqclinica1"] },
    { id: "biomol", nombre: "Biología Molecular", abre: ["biomolaplicada"] },
    { id: "ingles3", nombre: "Inglés III" },
    { id: "cfg5", nombre: "CFG 5" },
    { id: "hematoclinica1", nombre: "Hematología Clínica I", abre: ["hematoclinica2"] },
    { id: "bioqclinica1", nombre: "Bioquímica Clínica I", abre: ["bioqclinica2", "inmunoclinica"] },
    { id: "biomolaplicada", nombre: "Biología Molecular Aplicada", abre: ["micro"] },
    { id: "saludpublica", nombre: "Salud Pública y Epidemiología", abre: ["gestion"] },
    { id: "hematoclinica2", nombre: "Hematología Clínica II", abre: ["inmunohema", "hematoclinica3"] },
    { id: "bioqclinica2", nombre: "Bioquímica Clínica II", abre: ["micro"] },
    { id: "inmunoclinica", nombre: "Inmunología Clínica", abre: ["inmunohema"] },
    { id: "gestion", nombre: "Administración y Gestión en Salud", abre: ["calidad"] },
    { id: "cfg6", nombre: "CFG 6" },
    { id: "micro", nombre: "Microbiología Clínica", abre: ["diagnostico"] },
    { id: "inmunohema", nombre: "Inmunohematología", abre: ["transfusional"] },
    { id: "hematoclinica3", nombre: "Hematología Clínica III" },
    { id: "calidad", nombre: "Gestión de Calidad en Bioanálisis Clínico", abre: ["gestioninvestigacion"] },
    { id: "diagnostico", nombre: "Diagnóstico Microbiológico y Parasitológico" },
    { id: "transfusional", nombre: "Medicina Transfusional" },
    { id: "electivo1", nombre: "Electivo Profesional I" },
    { id: "gestioninvestigacion", nombre: "Gestión e Investigación en Salud", abre: ["gestionprimaria"] },
    { id: "internado1", nombre: "Internado I" },
    { id: "electivo2", nombre: "Electivo Profesional II" },
    { id: "electivo3", nombre: "Electivo Profesional III" },
    { id: "gestionprimaria", nombre: "Gestión en Atención Primaria" },
    { id: "internado2", nombre: "Internado II" }
];

const estadoCursos = {};

function crearCurso(curso) {
    const div = document.createElement("div");
    div.className = "curso";
    div.textContent = curso.nombre;
    div.id = curso.id;

    if (curso.abre) {
        div.dataset.abre = curso.abre.join(",");
    }

    div.onclick = () => {
        if (div.classList.contains("bloqueado")) return;

        div.classList.add("aprobado");
        div.onclick = null;
        estadoCursos[curso.id] = true;

        if (curso.abre) {
            curso.abre.forEach(id => {
                const siguiente = document.getElementById(id);
                if (siguiente && siguiente.classList.contains("bloqueado")) {
                    siguiente.classList.remove("bloqueado");
                }
            });
        }
    };

    return div;
}

window.onload = () => {
    const contenedor = document.getElementById("malla");
    cursos.forEach(curso => {
        const div = crearCurso(curso);
        if (curso.abre && !estadoCursos[curso.id]) {
            div.classList.add("bloqueado");
        }
        contenedor.appendChild(div);
    });
};
