%{
// Aquí se incluyen las acciones semánticas de JavaScript necesarias.
const Aritmeticas = require('./expresiones/Aritmeticas')
const Nativo = require('./Expresiones/Nativo')
const Tipo = require('./Simbolo/Tipo')

const CreacionVariable = require('./Instrucciones/CreacionVariable')
const Declaracion = require('./Instrucciones/Declaracion')
const Imprimir = require('./Instrucciones/Imprimir')
const AccesoVariable = require('./Expresiones/AccesoVariable')
const Asignacion = require('./Instrucciones/AsignacionVariable')
const Casteo = require('./Instrucciones/Casteo')
const IncrementoDecremento = require('./Instrucciones/IncrementoDecremento')
const ListaUnidimensional = require('./Instrucciones/ListaUnidimensional')
const ListaBidimensional = require('./Instrucciones/ListaBidimensional')
const ListaTridimensional = require('./Instrucciones/ListaTridimensional')

//variables para la cadena:
    var cadenaa="";
    let caracter ="";
%}

%lex
%options case-sensitive
%x stringss
%x caracter

%%
\s+                                     //para ignorar espacios en blanco
"//".*                                  //comentario en linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     //comentario de varias lineas

//-----------------TIPOS-----------------
"entero"                        return 'ENTERO';
"decimal"                       return 'DECIMAL';
"caracter"                      return 'CARACTER';
"boolean"                       return 'BOOLEANO';
"cadena"                        return 'CADENA';
"null"                          return 'NULL';

//-----------------SIGNOS-----------------
"->"                        return 'ARROW';
//"‘"                         return 'TILDE_IZQUIERDA';
//"’"                         return 'TILDE_DERECHA';
//"\""                        return 'COMILLAS';
"("                         return 'PARENTESIS_ABRIR';
")"                         return 'PARENTESIS_CERRAR';
//":"                         return 'DOSPUNTOS';
","                         return 'COMA';
"++"                        return 'INCREMEENTO';
"--"                        return 'DECREMEENTO';
"."                         return 'PUNTO';
"false"                     return 'FALSE';
"true"                      return 'TRUE';

//-----------------OPERACIONES-----------------
"=="                            return '==';
"!="                            return '!=';
"<="                            return '<=';
">="                            return '>=';
"-"                             return '-';
"^"                             return '^';
"*"                             return '*';
"/"                             return '/';
"%"                             return '%';
"+"                             return '+';
"<"                             return '<';
">"                             return '>';
"!"                             return '!';
"&&"                            return '&&';
"||"                            return '||';

"["                             return 'CORCHIN';
"]"                             return 'CORCHFIN';

//-------------------PALABRAS RESERVADAS-----------------
"ingresar"                      return 'INGRESAR';
"como"                          return 'COMO';
"con valor"                     return 'CON_VALOR';

//-----------------CONDICIONALES-----------------
"si"                            return 'SI';
"entonces"                      return 'ENTONCES';
"fin si"                        return 'FIN_SI';
"de lo contrario"               return 'DE_LO_CONTRARIO';
"o si"                          return 'O_SI';
//-----------------SELECCION MULTIPLE-----------------
"segun"                         return 'SEGUN';
"hacer"                         return 'HACER';
"en caso de ser"                return 'EN_CASO_DE_SER';
"detener"                       return 'DETENER';
"fin segun"                     return 'FIN_SEGUN';
"de lo contrario entonces"      return 'DE_LO_CONTRARIO_ENTONCES';

//**************************CICLOS**************************
//-----------------FOR-----------------
"para"                          return 'PARA';
"hasta"                         return 'HASTA';
"con incremento"                return 'CON_INCREMENTO';
"con decremento"                return 'CON_DECREMENTO';
"fin para"                      return 'FIN_PARA';

//-----------------WHILE-----------------
"mientras"                      return 'MIENTRAS';
"fin mientras"                  return 'FIN_MIENTRAS';

//-----------------DO WHILE-----------------
"repetir"                       return 'REPETIR';
"hasta que"                     return 'HASTA_QUE';

//*****************SENTENCIAS DE TRANSFERENCIA******************
"detener"                       return 'DETENER';
"continuar"                     return 'CONTINUAR';
"retonar"                       return 'RETORNAR';

//*******************************METODOS*******************************
//--------------------FUNCIONES/ METODOS CON RETORNO--------------------
"funcion"                       return 'FUNCION';
"fin funcion"                   return 'FIN_FUNCION';
"con parametros"                return 'CON_PARAMETROS';

//--------------------PROCEDIMIENTOS/ METODOS SIN RETORNO--------------------
"procedimiento"                 return 'PROCEDIMIENTO';
"fin procedimiento"             return 'FIN_PROCEDIMIENTO';

//-----------------LLAMADA DE PROCEDIMIENTOS Y FUNCIONES-----------------
"ejecutar"                      return 'EJECUTAR';

//*******************************OBJETOS*******************************
//-----------------OBJETOS-----------------
"objeto"                        return 'OBJETO';

//-----------------METODOS-----------------
"metodo"                        return 'METODO';
"fin metodo"                    return 'FIN_METODO';

//----------------IMPRIMIR----------------
"imprimir"                      return 'IMPRIMIR';

//*******************************FUNCIONES NATIVAS*******************************
"minuscula"                     return 'MINUSCULA';
"mayuscula"                     return 'MAYUSCULA';
"longitud"                      return 'LONGITUD';
"truncar"                       return 'TRUNCAR';
"redondear"                     return 'REDONDEAR';
"tipo"                          return 'TIPO';

"inc"                           return 'INCREMENTO';
"dec"                           return 'DECREMENTO';

"Lista"                         return 'LISTA';
"nl"                            return 'NUEVALINEA';


[0-9]+"."[0-9]+             return "DECIMAL_VALOR";
[0-9]+                      return "ENTERO_VALOR";


//Texto con o sin secuancias de escape
["]                             { cadenaa=""; this.begin("stringss"); }
<stringss>[^"\\]+                 { cadenaa+=yytext; }
<stringss>"\\\""                  { cadenaa+="\""; }
<stringss>"\\n"                   { cadenaa+="\n"; }
<stringss>\s                      { cadenaa+=" ";  }
<stringss>"\\t"                   { cadenaa+="\t"; }
<stringss>"\\\\"                  { cadenaa+="\\"; }
<stringss>"\\'"                   { cadenaa+="\'"; }
<stringss>[^"\\]+                 { console.log("Agregando a cadena:", yytext); cadenaa+=yytext; }
<stringss>["]                     { yytext=cadenaa; this.popState(); return 'CADENAS_VALOR'; }


//----------------char con o sin secuancias de escape----------------
[']                             { caracter=""; this.begin("caracter"); }
<caracter>[^'\\]+                 { caracter=yytext; }
<caracter>"\\\""                  { caracter="\""; }
<caracter>"\\n"                   { caracter="\n"; }
<caracter>\s                      { caracter=" ";  }
<caracter>"\\t"                   { caracter="\t"; }
<caracter>"\\\\"                  { caracter="\\"; }
<caracter>"\\'"                   { caracter="\'"; }
<caracter>[']                     { yytext=caracter; this.popState(); return 'CARACTER_VALOR'; }

[a-zA-Z][a-zA-Z0-9_]*       return "IDENTIFICADOR";

//ignorar espacios en blanco
[\ \r\t\f\n]+           {};

.                       { console.log("Error lexico: "+yytext);}
//fin de cadena
<<EOF>>                 return 'EOF';

//directiva lex
/lex

//aca inicia la parte del analisis sintactico
%{
    //Aca tambien puedo agregar codigo en javascript
%}

%right CASTEO
%left '||'
%left '&&'
%right '!'
%left '==' '!=' '<=' '>=' '<' '>'
%left '+' '-'
%left '*' '/' '%'
%right '^'
%right UMENOS

//Simbolo inicial
%start inicio

%%

inicio : instrucciones EOF { return $1; }
;

instrucciones : instrucciones instruccion   { if($2 != false) $1.push($2); $$ = $1 }
                | instruccion               { $$ = ($1!= false) ? [$1] : []}
;

instruccion : declaraciones                 {$$ = $1;}
            | asignacion_o_metodo_objeto    {$$ = $1;}
            | casteo                        {$$ = $1;}
            | incrementar_o_decrementar     {$$ = $1;}
            | declaracion_listas            {$$ = $1;}
            //| PARENTESIS_ABRIR tipo_de_lista_para_listas PARENTESIS_CERRAR     {$$ = $1;} //comentado temporariamente
            | acceso_a_listas               {$$ = $1;}
            | condicion_si                  {$$ = $1;}
            | seleccion_multiple            {$$ = $1;}
            | ciclo_para                    {$$ = $1;}
            | ciclo_mientras                {$$ = $1;}
            | ciclo_repetir_hasta           {$$ = $1;}
            | sentencias_de_transferencia   {$$ = $1;}
            | funciones                     {$$ = $1;}
            | procedimientos                {$$ = $1;}
            | llamada_funcion               {$$ = $1;}
            | objetos                       {$$ = $1;}
            | instanciacion_objetos         {$$ = $1;}
            | objetos_accesos_metodos       {$$ = $1;}
            | impresion                     {$$ = $1;}
            | hacer_minuscula               {$$ = $1;}
            | hacer_mayuscula               {$$ = $1;}
            | hacer_longitud                {$$ = $1;}
            | hacer_truncar                 {$$ = $1;}
            | hacer_redondear               {$$ = $1;}
            | averiguar_tipo                {$$ = $1;}
            | error
;

//**************************DECLARACIONES**************************

declaraciones : INGRESAR identificadores_multiples COMO tipo_dato con_valor_o_sin_valor
{
        if ($5 == null || $5 == false) {
            $$ = new CreacionVariable.default($4, @1.first_line, @1.first_column, $2);
        } else {
            if ($2.length != $5.length) {
                yyerror("Error: la cantidad de variables y valores no coincide (línea " + @1.first_line + ")");
                $$ = false;
            } else {
                $$ = new Declaracion.default($4, @1.first_line, @1.first_column, $2, $5);
            }
        }
    }
;

con_valor_o_sin_valor : CON_VALOR lista_expresiones     {$$ = $2;}
                    | /* nada */                       {$$ = false;}
;

identificadores_multiples : identificadores_multiples COMA IDENTIFICADOR        { $$ = [...$1, $3]; }
                | IDENTIFICADOR                                                 { $$ = [$1]; }
;

//**************************ASIGNACION DE VARIABLES/METODOS DE OBJETOS**************************
asignacion_o_metodo_objeto : identificadores_multiples ARROW continuacion_arrow
{
        if ($3.tipo === 'asignacion') {
            $$ = new Asignacion.default($1, $3.valores, @1.first_line, @1.first_column);
        } else if ($3.tipo === 'metodo') {
          // $$ = new LlamadaMetodo.default($1, $3.nombreMetodo, $3.instrucciones, @1.first_line, @1.first_column);
        }
}
;

continuacion_arrow : METODO IDENTIFICADOR fin_con_parametros_o_sin FIN_METODO // Para método de objeto
{        $$ = {
            tipo: 'metodo',
            nombreMetodo: $2,
            instrucciones: $3
        };
}
                   | lista_expresiones                             // Para asignación
{
        $$ = {
            tipo: 'asignacion',
            valores: $1
        };
}
;

//**************************CASTEOS**************************
casteo : PARENTESIS_ABRIR tipo_dato PARENTESIS_CERRAR expresion %prec CASTEO
{ $$ = new Casteo.default($4, $2, @1.first_line, @1.first_column); }
;

//**************************INCREMENTO Y DECREMENTO**************************
incrementar_o_decrementar : increment_or_decrement PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
{
    if (!$3 || typeof $3.interpretar !== "function") {
        return new Errores("Semántico", "La expresión dentro de inc/dec debe ser una variable válida", @1.first_line, @1.first_column);
    }

    // Aseguramos que sea un acceso directo a una variable, no una operación
    if (!$3.id) {
        return new Errores("Semántico", "Solo se puede aplicar inc/dec a una variable directamente", @1.first_line, @1.first_column);
    }

    const id = $3.id;
    const accion = $1; // ya es 'mas' o 'menos'
    $$ = new IncrementoDecremento.default(id, @1.first_line, @1.first_column, accion);
}
;

increment_or_decrement : INCREMENTO     { $$ = "mas" }
                    | DECREMENTO        { $$ = "menos" }
;

//*******************DECLARACION LISTAS**************************
//---------------------DECLARCION LISTA UNIDIMENSIONAL---------------------
declaracion_listas : INGRESAR LISTA PARENTESIS_ABRIR expresion COMA tipo_dato PARENTESIS_CERRAR IDENTIFICADOR ARROW tipo_de_lista_para_listas
{
    const contenidoLista = $10.valor;
    const dimension = $4.valor;

if (
    ($10.tipo == 'unidimensional' && dimension !== 1) ||
    ($10.tipo == 'bidimensional' && dimension !== 2) ||
    ($10.tipo == 'tridimensional' && dimension !== 3)
) {
    console.log("Error: Dimensión no coincide con tipo de lista");
    //$$ = new Errores("Semántico", `Dimensión no coincide con tipo de lista: se declaró ${dimension} dimensiones pero se obtuvo tipo ${$10.tipo}`, @1.first_line, @1.first_column);
    return;
}


    switch ($10.tipo) {
        case 'unidimensional':
            $$ = new ListaUnidimensional.default($8, $6, contenidoLista, @1.first_line, @1.first_column);
            break;
        case 'bidimensional':
            $$ = new ListaBidimensional.default($8, $6, contenidoLista, @1.first_line, @1.first_column);
            break;
        case 'tridimensional':
            $$ = new ListaTridimensional.default($8, $6, contenidoLista, @1.first_line, @1.first_column);
            break;
        default:
            $$ = new Errores("Semántico", "Tipo de lista desconocido", @1.first_line, @1.first_column);
    }
}
;

//---------------------DECLARCION TIPO DE LISTAS---------------------
tipo_de_lista_para_listas : lista_ud
{       $$ = {
            tipo: 'unidimensional',
            valor: $1
            }
;}
                | lista_bd_aux
{       $$ = {
            tipo: 'bidimensional',
            valor: $1
            }
;}
                | lista_td_aux
{       $$ = {
            tipo: 'tridimensional',
            valor: $1
            }
;}
;

//---------------------LISTA PARA LISTAS UNIDIMENSIONAL---------------------
lista_ud : PARENTESIS_ABRIR lista_expresiones PARENTESIS_CERRAR
{
    $$ = $2;
}
;

//---------------------LISTA PARA LISTAS BIDIMENSIONAL---------------------
lista_bd_contenido : lista_bd_contenido COMA lista_ud
{
    $$ = [...$1, $3]; // agregamos otra fila (lista unidimensional) a las filas ya existentes
}
                    | lista_ud
{
    $$ = [$1]; // primera fila
}
;

lista_bd_aux : PARENTESIS_ABRIR lista_bd_contenido PARENTESIS_CERRAR
{
    $$ = $2; // simplemente pasamos el arreglo de filas
};
//---------------------LISTA PARA LISTAS TRIDIMENSIONAL---------------------
lista_td_contenido : lista_td_contenido COMA lista_bd_aux
{
    $$ = [...$1, $3]; // agregamos otra "matriz" (otra lista de listas) a las existentes
}
                    | lista_bd_aux
{
    $$ = [$1]; // primera "matriz" (una lista bidimensional)
}
;

lista_td_aux : PARENTESIS_ABRIR lista_td_contenido PARENTESIS_CERRAR
{
    $$ = $2; // pasamos arreglo de matrices
}
;

//*******************ACCESO A LISTAS**************************
acceso_a_listas : IDENTIFICADOR indices_de_listas modificar_lista
;

indices_de_listas : indices_de_listas indice_lista
                | indice_lista
;

indice_lista : CORCHIN expresion CORCHFIN
;

//----------------------MODIFICACION DE LISTAS---------------------
modificar_lista : '=' expresion
                | /* nada */
;

//**************************CONDICIONALES**************************
/*
if -> si
else if -> o si
else -> de lo contrario
*/
//---------------------IF/SI---------------------
condicion_si : SI expresion ENTONCES instrucciones fin_o_condicion;

fin_o_condicion : fin_condicion_si
                | FIN_SI
;

fin_condicion_si : DE_LO_CONTRARIO instrucciones FIN_SI
                | O_SI instrucciones fin_o_condicion
;

//**************************SELECCION MULTIPLE**************************
//---------------------SWITCH CASE/ SELECCION MULTIPLE---------------------
seleccion_multiple : SEGUN expresion HACER opciones DE_LO_CONTRARIO_ENTONCES instrucciones FIN_SEGUN
;

opciones : opciones seleccion
        | seleccion
;

seleccion : EN_CASO_DE_SER expresion ENTONCES instrucciones
;

//**************************FOR/ CICLO PARA**************************
ciclo_para : PARA IDENTIFICADOR ARROW expresion HASTA expresion incremento_decremento HACER instrucciones FIN_PARA
;

incremento_decremento : CON_INCREMENTO aumentos
                    | CON_DECREMENTO aumentos
;

//**************************MIENTRAS/ WHILE**************************
ciclo_mientras : MIENTRAS expresion HACER instrucciones FIN_MIENTRAS
;

//**************************REPETIR HASTA/ DO WHILE**************************
ciclo_repetir_hasta : REPETIR instrucciones HASTA_QUE expresion
;

//**************************SENTENCIAS DE TRANSFERENCIA/ SENTENCIAS DE ESCAPE**************************
sentencias_de_transferencia : DETENER
                            | CONTINUAR
                            | RETORNAR
;

//**************************FUCNIONES**************************
//---------------------FUNCIONES/ METODOS CON RETORNO---------------------
funciones : FUNCION IDENTIFICADOR tipo_dato proce_o_func_con_parametros_o_sin FIN_FUNCION
;

procedimientos : PROCEDIMIENTO IDENTIFICADOR proce_o_func_con_parametros_o_sin FIN_PROCEDIMIENTO
;

proce_o_func_con_parametros_o_sin : CON_PARAMETROS PARENTESIS_ABRIR lista_parametros PARENTESIS_CERRAR instrucciones
                                    | instrucciones
;

//---------------------LLAMADA DE FUNCIONES/ PROCEDIMIENTOS---------------------
llamada_funcion : EJECUTAR IDENTIFICADOR PARENTESIS_ABRIR lista_expresiones_o_no PARENTESIS_CERRAR
;

lista_expresiones_o_no : lista_expresiones
                | /* nada */
;

//**************************OBJETOS**************************
//---------------------CREACION---------------------
objetos : OBJETO IDENTIFICADOR PARENTESIS_ABRIR atributos PARENTESIS_CERRAR
;

//---------------------ATRIBUTOS---------------------
atributos : atributos atributo
            | atributo
;

atributo : IDENTIFICADOR tipo_dato
;

//---------------------METODOS---------------------
fin_con_parametros_o_sin : instrucciones
                | CON_PARAMETROS PARENTESIS_ABRIR lista_parametros PARENTESIS_CERRAR instrucciones
;

//---------------------INSTANCIACION---------------------
instanciacion_objetos : INGRESAR OBJETO IDENTIFICADOR IDENTIFICADOR ARROW IDENTIFICADOR PARENTESIS_ABRIR lista_expresiones PARENTESIS_CERRAR
;

//---------------------ACCESO A ATRIBUTOS Y METODOS DE OBJETOS---------------------
objetos_accesos_metodos : IDENTIFICADOR PUNTO IDENTIFICADOR
                        | EJECUTAR IDENTIFICADOR PUNTO IDENTIFICADOR PARENTESIS_ABRIR con_lista_o_sin PARENTESIS_CERRAR
;

con_lista_o_sin : lista_expresiones
                | /* nada */
;

//******************IMPRIMIR**************************
impresion : IMPRIMIR expresion {
        $$ = new Imprimir.default($2, @1.first_line, @1.first_column, "");
    }
            | IMPRIMIR NUEVALINEA expresion {
        $$ = new Imprimir.default($3, @1.first_line, @1.first_column, "\n");
    }
;

//*******************FUNCIONES NATIVAS**************************
//---------------------MINUSCULA---------------------
hacer_minuscula : MINUSCULA PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

//---------------------MAYUSCULA---------------------
hacer_mayuscula : MAYUSCULA PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

//---------------------LONGITUD---------------------
hacer_longitud : LONGITUD PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

//---------------------TRUNCAR---------------------
hacer_truncar : TRUNCAR PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

//---------------------REDONDEAR---------------------
hacer_redondear : REDONDEAR PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

//---------------------TIPO---------------------
averiguar_tipo : TIPO PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

//**************************TIPOS DE DATOS**************************
//---------------------TIPOS DE DATOS---------------------
tipo_dato : ENTERO          { $$ = new Tipo.default(Tipo.tipo_dato.ENTERO)}
            | DECIMAL       { $$ = new Tipo.default(Tipo.tipo_dato.DECIMAL)}
            | CARACTER      { $$ = new Tipo.default(Tipo.tipo_dato.CARACTER)}
            | BOOLEANO      { $$ = new Tipo.default(Tipo.tipo_dato.BOOLEANO)}
            | CADENA        { $$ = new Tipo.default(Tipo.tipo_dato.CADENA)}
            //| NULL
;

//**************************EXPRESIONES**************************
//---------------------EXPRESIONES--------------------------
expresion: '-' expresion %prec UMENOS   { $$ = new Aritmeticas.default(Aritmeticas.Operadores.NEGACION, @1.first_line, @1.first_column, $2) }
    | '!' expresion
    | expresion '||' expresion
    | expresion '&&' expresion
    | expresion '==' expresion
    | expresion '!=' expresion
    | expresion '>=' expresion
    | expresion '<=' expresion
    | expresion '<' expresion
    | expresion '>' expresion
    | expresion '+' expresion   { $$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA, @1.first_line, @1.first_column, $1, $3) }
    | expresion '-' expresion
    | expresion '*' expresion
    | expresion '/' expresion
    | expresion '%' expresion
    | expresion '^' expresion
    | ENTERO_VALOR              { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.ENTERO), $1, @1.first_line, @1.first_column)}
    | DECIMAL_VALOR             { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.DECIMAL), $1, @1.first_line, @1.first_column)}
    | CADENAS_VALOR             { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.CADENA), $1, @1.first_line, @1.first_column)}
    | CARACTER_VALOR            { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.CARACTER), $1, @1.first_line, @1.first_column)}
    | TRUE                      { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.BOOLEANO), $1, @1.first_line, @1.first_column)}
    | FALSE                     { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.BOOLEANO), $1, @1.first_line, @1.first_column)}
    | IDENTIFICADOR             { $$ = new AccesoVariable.default($1, @1.first_line, @1.first_column)}
    | PARENTESIS_ABRIR expresion PARENTESIS_CERRAR  { $$ = $2 }
    | casteo
    | aumentos
;

//**********************LISTAS**************************
//---------------------LISTA PARAMETROS---------------------
lista_parametros : lista_parametros COMA IDENTIFICADOR tipo_dato
                | IDENTIFICADOR tipo_dato
;

//---------------------LISTA EXPRESIONES---------------------
lista_expresiones : lista_expresiones COMA expresion    { $$ = [...$1, $3]; }
                | expresion                             { $$ = [$1]; }
;

//**********************EXTRAS**************************
aumentos : IDENTIFICADOR INCREMEENTO
            | IDENTIFICADOR DECREMEENTO
;

%%
