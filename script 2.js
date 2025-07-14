
const cursos = [
  { id: "morfo1", nombre: "Morfofunción I", semestre: 1, abre: ["morfo2"] },
  { id: "mate", nombre: "Matemáticas y Biofísica", semestre: 1, abre: ["quimica"] },
  { id: "biocel", nombre: "Biología Celular y Genética", semestre: 1, abre: ["morfo2"] },
  { id: "comunicacion", nombre: "Comunicación y Tecnología", semestre: 1 },
  { id: "etica", nombre: "Orientación y Ética", semestre: 1 },
  { id: "morfo2", nombre: "Morfofunción II", semestre: 2, abre: ["fisiopato"] },
  { id: "quimica", nombre: "Química General y Orgánica", semestre: 2, abre: ["fisiopato", "bioquimica"] },
  { id: "ingles1", nombre: "Inglés I", semestre: 2, abre: ["ingles2"] },
  { id: "cfg1", nombre: "CFG 1", semestre: 2 },
  { id: "cfg2", nombre: "CFG 2", semestre: 2 },
  { id: "fisiopato", nombre: "Fisiopatología y Farmacología", semestre: 3, abre: ["inmunobasica", "bioseguridad"] },
  { id: "bioquimica", nombre: "Bioquímica", semestre: 3, abre: ["bioseguridad"] },
  { id: "ingles2", nombre: "Inglés II", semestre: 3, abre: ["ingles3"] },
  { id: "cfg3", nombre: "CFG 3", semestre: 3 },
  { id: "cfg4", nombre: "CFG 4", semestre: 3 },
  { id: "inmunobasica", nombre: "Inmunología Básica", semestre: 4, abre: ["bioqclinica1"] },
  { id: "bioseguridad", nombre: "Bioseguridad y Enfermería", semestre: 4, abre: ["hematoclinica1", "bioqclinica1", "saludpublica"] },
  { id: "labclinico", nombre: "Métodos de Laboratorio Clínico", semestre: 4, abre: ["hematoclinica1", "bioqclinica1"] },
  { id: "biomol", nombre: "Biología Molecular", semestre: 4, abre: ["biomolaplicada"] },
  { id: "ingles3", nombre: "Inglés III", semestre: 4 },
  { id: "cfg5", nombre: "CFG 5", semestre: 4 },
  { id: "hematoclinica1", nombre: "Hematología Clínica I", semestre: 5, abre: ["hematoclinica2"] },
  { id: "bioqclinica1", nombre: "Bioquímica Clínica I", semestre: 5, abre: ["bioqclinica2", "inmunoclinica"] },
  { id: "biomolaplicada", nombre: "Biología Molecular Aplicada", semestre: 5, abre: ["micro"] },
  { id: "saludpublica", nombre: "Salud Pública y Epidemiología", semestre: 5, abre: ["gestion"] },
  { id: "hematoclinica2", nombre: "Hematología Clínica II", semestre: 6, abre: ["inmunohema", "hematoclinica3"] },
  { id: "bioqclinica2", nombre: "Bioquímica Clínica II", semestre: 6, abre: ["micro"] },
  { id: "inmunoclinica", nombre: "Inmunología Clínica", semestre: 6, abre: ["inmunohema"] },
  { id: "gestion", nombre: "Administración y Gestión en Salud", semestre: 6, abre: ["calidad"] },
  { id: "cfg6", nombre: "CFG 6", semestre: 6 },
  { id: "micro", nombre: "Microbiología Clínica", semestre: 7, abre: ["diagnostico"] },
  { id: "inmunohema", nombre: "Inmunohematología", semestre: 7, abre: ["transfusional"] },
  { id: "hematoclinica3", nombre: "Hematología Clínica III", semestre: 7 },
  { id: "calidad", nombre: "Gestión de Calidad", semestre: 7, abre: ["gestioninvestigacion"] },
  { id: "diagnostico", nombre: "Diagnóstico Microbiológico", semestre: 8 },
  { id: "transfusional", nombre: "Medicina Transfusional", semestre: 8 },
  { id: "electivo1", nombre: "Electivo Profesional I", semestre: 8 },
  { id: "gestioninvestigacion", nombre: "Gestión e Investigación en Salud", semestre: 8, abre: ["gestionprimaria"] },
  { id: "internado1", nombre: "Internado I", semestre: 9 },
  { id: "electivo2", nombre: "Electivo Profesional II", semestre: 9 },
  { id: "electivo3", nombre: "Electivo Profesional III", semestre: 9 },
  { id: "gestionprimaria", nombre: "Gestión en Atención Primaria", semestre: 9 },
  { id: "internado2", nombre: "Internado II", semestre: 10 }
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

  const semestres = [...new Set(cursos.map(c => c.semestre))];

  semestres.forEach(num => {
    const section = document.createElement("div");
    section.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${num}`;
    section.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "grid-container";

    cursos.filter(c => c.semestre === num).forEach(curso => {
      const div = crearCurso(curso);
      if (curso.abre && !estadoCursos[curso.id]) {
        div.classList.add("bloqueado");
      }
      grid.appendChild(div);
    });

    section.appendChild(grid);
    contenedor.appendChild(section);
  });
};
