export function PonerPuntos(valor: any) {
    var cadena = valor.toString();
    var lon = cadena.length - 3;
    while (lon > 0) {
        cadena = cadena.substring(0, lon) + "." + cadena.substring(lon);
        lon -= 3;
    }
    return cadena;
}