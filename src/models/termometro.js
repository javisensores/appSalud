class Termometro {
  constructor(id = null, paciente_id = null, temperatura = null, unidad = 'celsius', fecha = null) {
    // Valores de registro persistido
    this.id = id;
    this.paciente_id = paciente_id;
    this.temperatura = temperatura;
    this.unidad = unidad;
    this.fecha = fecha;

    // Compatibilidad en memoria
    this.temperaturas = [];
  }

  anotarTemperatura(temp) {
    this.temperaturas.push(temp);
  }

  convertirCelsiusAFahrenheit(temp) {
    return (temp * 9/5) + 32;
  }

  convertirFahrenheitACelsius(temp) {
    return (temp - 32) * 5/9;
  }

  obtenerTemperaturaMaxima() {
    if (this.temperaturas.length === 0) return null;
    return Math.max(...this.temperaturas);
  }

  obtenerTemperaturaMinima() {
    if (this.temperaturas.length === 0) return null;
    return Math.min(...this.temperaturas);
  }

  obtenerNumeroAnotaciones() {
    return this.temperaturas.length;
  }
}

module.exports = Termometro;