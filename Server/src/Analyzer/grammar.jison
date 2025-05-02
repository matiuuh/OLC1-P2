%{
// Aquí se incluyen las acciones semánticas de JavaScript necesarias.
const Aritmeticas = require('./Expresiones/Aritmeticas')
const Nativo = require('./Expresiones/Nativo')
const AccesoLista = require('./Expresiones/AccesoLista')
const AccesoVariable = require('./Expresiones/AccesoVariable')
const ModificarLista = require('./Expresiones/ModificarLista')
const Relacionales = require('./Expresiones/Relacionales')
const FuncionesNativas = require('./Instrucciones/FuncionesNativas')
const Logicas = require('./Expresiones/Logicas')
//const Errores = require('../Errors/Errors')
const Si = require('./Instrucciones/Si')
const SeleccionCaso = require('./Instrucciones/Seleccion_caso')
const SeleccionMultiple = require('./Instrucciones/SeleccionMultiple')
const Default = require('./Instrucciones/SeleccionDefault')
const Mientras = require('./Instrucciones/Mientras')
const RepetirHasta = require('./Instrucciones/RepetirHasta')
const Para = require('./Instrucciones/Para')
const Funcion = require('./Instrucciones/Funcion')
const Procedimiento = require('./Instrucciones/Procedimiento')
const Tipo = require('./Simbolo/Tipo')
const Ejecutar = require('./Instrucciones/Ejecutar')
const LlamadaFuncion = require('./Instrucciones/LlamadaFuncion')

const CreacionVariable = require('./Instrucciones/CreacionVariable')
const Declaracion = require('./Instrucciones/Declaracion')
const Imprimir = require('./Instrucciones/Imprimir')
const Asignacion = require('./Instrucciones/AsignacionVariable')
const Casteo = require('./Instrucciones/Casteo')
const IncrementoDecremento = require('./Instrucciones/IncrementoDecremento')
const ListaUnidimensional = require('./Instrucciones/ListaUnidimensional')
const ListaBidimensional = require('./Instrucciones/ListaBidimensional')
const ListaTridimensional = require('./Instrucciones/ListaTridimensional')
const Retornar = require('./Instrucciones/Retornar')
const Detener = require('./Instrucciones/Detener')
const Continuar = require('./Instrucciones/Continuar')

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
"booleano"                       return 'BOOLEANO';
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
"Falso"                     return 'FALSE';
"Verdadero"                      return 'TRUE';

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
"<"                             return 'MENOR';
">"                             return 'MAYOR';
"!"                             return '!';
"&&"                            return '&&';
"||"                            return '||';
"="                         return 'IGUAL_SIMPLE';
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
//-----------------WHILE-----------------
"mientras"                      return 'MIENTRAS';
"fin mientras"                  return 'FIN_MIENTRAS';

//-----------------DO WHILE-----------------
"repetir"                       return 'REPETIR';
"hasta que"                     return 'HASTA_QUE';

//-----------------FOR-----------------
"para"                          return 'PARA';
"hasta"                         return 'HASTA';
"con incremento"                return 'CON_INCREMENTO';
"con decremento"                return 'CON_DECREMENTO';
"fin para"                      return 'FIN_PARA';

//*****************SENTENCIAS DE TRANSFERENCIA******************
"detener"                       return 'DETENER';
"continuar"                     return 'CONTINUAR';
"retornar"                       return 'RETORNAR';

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
%left '==' '!=' '<=' '>=' 'MENOR' 'MAYOR'
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
            | acceso_a_listas               {$$ = $1;}
            | condicion_si                  {$$ = $1;}
            | seleccion_multiple            {$$ = $1;}
            | ciclo_para                    {$$ = $1;}
            | ciclo_mientras                {$$ = $1;}
            | ciclo_repetir_hasta           {$$ = $1;}
            | sentencias_de_transferencia   {$$ = $1;}
            | funciones                     {$$ = $1;}
            | procedimientos                {$$ = $1;}
            | llamada_procedimiento         {$$ = $1;}
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
            | aumentos                      {$$ = $1;}
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
    const dimension = ($4 instanceof Nativo.default) ? parseInt($4.valor) : null;

    if (
        ($10.tipo == 'unidimensional' && dimension !== 1) ||
        ($10.tipo == 'bidimensional' && dimension !== 2) ||
        ($10.tipo == 'tridimensional' && dimension !== 3)
    ) {
        console.log("Error de dimensiones: Se declaró (" + dimension + ") dimensiones, pero el tipo de lista es " + $10.tipo);
        //$$ = new Errores("Semántico", `Error de dimensiones: Se declaró (${dimension}) dimensiones, pero el tipo de lista es ${$10.tipo}`, @1.first_line, @1.first_column);
    } else {
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
        }
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
{
    if ($3.tipo === 'sin_modificacion') {
        $$ = new AccesoLista.default($1, $2, @1.first_line, @1.first_column);
    } else {
        $$ = new ModificarLista.default($1, $2, $3.valor, @1.first_line, @1.first_column);
    }
}
;

indices_de_listas : indices_de_listas indice_lista
{
    $$ = [...$1, $2]; // Acumulamos los índices
}
                | indice_lista
{
    $$ = [$1]; // Primer índice
}
;

indice_lista : CORCHIN expresion CORCHFIN
{
    $$ = $2;
}
;

//----------------------MODIFICACION DE LISTAS---------------------
modificar_lista : IGUAL_SIMPLE expresion
{
    $$ = {
        tipo: 'modificacion',
        valor: $2
    };
}
                | /* nada */
{
    $$ = {
        tipo: 'sin_modificacion',
        valor: null
    };
}
;

//**************************CONDICIONALES**************************
/*
if -> si
else if -> o si
else -> de lo contrario
*/
//---------------------IF/SI---------------------
condicion_si : SI expresion ENTONCES instrucciones continuacion_si
{
    $$ = new Si.default($2, $4, @1.first_line, @1.first_column, $5?.condicion_else, $5?.instrucciones_else);
}
;

continuacion_si : FIN_SI
    { $$ = undefined; }
        | DE_LO_CONTRARIO instrucciones FIN_SI
    { $$ = { instrucciones_else: $2 }; }
        | O_SI expresion ENTONCES instrucciones continuacion_si
    { $$ = { condicion_else: new Si.default($2, $4, @1.first_line, @1.first_column, $5?.condicion_else, $5?.instrucciones_else)};}
;

//**************************SELECCION MULTIPLE**************************
//---------------------SWITCH CASE/ SELECCION MULTIPLE---------------------
seleccion_multiple : SEGUN expresion HACER cases_con_default FIN_SEGUN
        { $$ = new SeleccionMultiple.default($2, @1.first_line, @1.first_column, $4.casos, $4.defecto); }
;

cases_con_default : cases_list default_case
    { $$ = { casos: $1, defecto: $2 }; }
            | cases_list
    { $$ = { casos: $1, defecto: undefined }; }
            | default_case
    { $$ = { casos: undefined, defecto: $1 }; }
;

cases_list : cases_list case_simple
    { if ($2 != false) $1.push($2); $$ = $1; }
            | case_simple
    { $$ = ($1 != false) ? [$1] : []; }
;

case_simple : EN_CASO_DE_SER expresion ENTONCES instrucciones
    { $$ = new SeleccionCaso.default($2, $4, @1.first_line, @1.first_column); }
;

default_case : DE_LO_CONTRARIO_ENTONCES instrucciones
    { $$ = new Default.default($2, @1.first_line, @1.first_column); }
;

//**************************FOR/ CICLO PARA**************************
//---------------------FOR/ CICLO PARA---------------------
ciclo_para : PARA IDENTIFICADOR ARROW expresion HASTA expresion salto_para HACER instrucciones FIN_PARA
{ $$ = new Para.default($2, $4, $6, $7, $9, @1.first_line, @1.first_column);}
;

salto_para : CON_INCREMENTO incremento_op
{ $$ = { tipo: 'incremento', operacion: $2 }; }
            | CON_DECREMENTO incremento_op
{ $$ = { tipo: 'decremento', operacion: $2 }; }
;

incremento_op : aumentos    { $$ = $1; }
    | asignacion_simple     { $$ = $1; }
;

asignacion_simple : IDENTIFICADOR ARROW expresion
    { $$ = new Asignacion.default([$1], [$3], @1.first_line, @1.first_column); }
;


//**************************SENTENCIAS DE TRANSFERENCIA/ SENTENCIAS DE ESCAPE**************************
sentencias_de_transferencia : DETENER       { $$ = new Detener.default(@1.first_line, @1.first_column)}
                            | CONTINUAR     { $$ = new Continuar.default(@1.first_line, @1.first_column)}
                            | RETORNAR      { $$ = new Retornar.default(@1.first_line, @1.first_column)}
                            | RETORNAR expresion { $$ = new Retornar.default(@1.first_line, @1.first_column, $2) }
;

//**************************FUCNIONES**************************
//---------------------FUNCIONES/ METODOS CON RETORNO---------------------
funciones : FUNCION IDENTIFICADOR tipo_dato proce_o_func_con_parametros_o_sin FIN_FUNCION
{$$ = new Funcion.default($2, $3, $4.instrucciones, @1.first_line, @1.first_column, $4.parametros);}
;

procedimientos : PROCEDIMIENTO IDENTIFICADOR proce_o_func_con_parametros_o_sin FIN_PROCEDIMIENTO
{$$ = new Procedimiento.default($2, new Tipo.default(Tipo.tipo_dato.VOID), $3.instrucciones, @1.first_line, @1.first_column, $3.parametros);}
;

proce_o_func_con_parametros_o_sin : CON_PARAMETROS PARENTESIS_ABRIR lista_parametros PARENTESIS_CERRAR instrucciones
{$$ = { parametros: $3, instrucciones: $5 };}
                                    | instrucciones
{$$ = { parametros: [], instrucciones: $1 };}
;

//---------------------LLAMADA DE FUNCIONES/ PROCEDIMIENTOS---------------------
llamada_procedimiento : EJECUTAR IDENTIFICADOR PARENTESIS_ABRIR lista_expresiones_o_no PARENTESIS_CERRAR
{ $$ = new Ejecutar.default($2, @1.first_line, @1.first_column, $4); }
;

lista_expresiones_o_no : lista_expresiones  { $$ = $1; }
                | /* nada */                { $$ = [] }
;

llamada_funcion : IDENTIFICADOR PARENTESIS_ABRIR lista_expresiones_o_no PARENTESIS_CERRAR
{$$ = new LlamadaFuncion.default($1, @1.first_line, @1.first_column, $3);}
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
impresion : IMPRIMIR expresion                  {$$ = new Imprimir.default($2, @1.first_line, @1.first_column, "");}
            | IMPRIMIR NUEVALINEA expresion     {$$ = new Imprimir.default($3, @1.first_line, @1.first_column, "\n");}
;

//*******************FUNCIONES NATIVAS**************************
//---------------------MINUSCULA---------------------
hacer_minuscula : MINUSCULA PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
{$$ = new FuncionesNativas.default(FuncionesNativas.Operadores.LOWER, @1.first_line, @1.first_column, $3);}
;

//---------------------MAYUSCULA---------------------
hacer_mayuscula : MAYUSCULA PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
{$$ = new FuncionesNativas.default(FuncionesNativas.Operadores.UPPER, @1.first_line, @1.first_column, $3);}
;

//---------------------LONGITUD---------------------
hacer_longitud : LONGITUD PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
{$$ = new FuncionesNativas.default(FuncionesNativas.Operadores.LENGTH, @1.first_line, @1.first_column, $3);}
;

//---------------------TRUNCAR---------------------
hacer_truncar : TRUNCAR PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
{$$ = new FuncionesNativas.default(FuncionesNativas.Operadores.TRUNCAR, @1.first_line, @1.first_column, $3);}
;

//---------------------REDONDEAR---------------------
hacer_redondear : REDONDEAR PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
{$$ = new FuncionesNativas.default(FuncionesNativas.Operadores.ROUND, @1.first_line, @1.first_column, $3);}
;

//---------------------TIPO---------------------
averiguar_tipo : TIPO PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
{ $$ = new FuncionesNativas.default(FuncionesNativas.Operadores.TIPODATO, @1.first_line, @1.first_column, $3);}
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
    | '!' expresion             { $$ = new Logicas.default(Logicas.Logico.NOT, @1.first_line, @1.first_column, $2)}
    | expresion '||' expresion  { $$ = new Logicas.default(Logicas.Logico.OR, @1.first_line, @1.first_column, $1, $3)}
    | expresion '&&' expresion  { $$ = new Logicas.default(Logicas.Logico.AND, @1.first_line, @1.first_column, $1, $3)}
    | expresion '==' expresion  { $$ = new Relacionales.default(Relacionales.Relacional.IGUAL, $1, $3,@1.first_line, @1.first_column)}
    | expresion '!=' expresion  { $$ = new Relacionales.default(Relacionales.Relacional.DIF, $1, $3,@1.first_line, @1.first_column)}
    | expresion '>=' expresion  { $$ = new Relacionales.default(Relacionales.Relacional.MAYORI, $1, $3,@1.first_line, @1.first_column)}
    | expresion '<=' expresion  { $$ = new Relacionales.default(Relacionales.Relacional.MENORI, $1, $3,@1.first_line, @1.first_column)}
    | expresion MENOR expresion { $$ = new Relacionales.default(Relacionales.Relacional.MENOR, $1, $3,@1.first_line, @1.first_column)}
    | expresion MAYOR expresion { $$ = new Relacionales.default(Relacionales.Relacional.MAYOR, $1, $3,@1.first_line, @1.first_column)}
    | expresion '+' expresion   { $$ = new Aritmeticas.default(Aritmeticas.Operadores.SUMA, @1.first_line, @1.first_column, $1, $3)}
    | expresion '-' expresion   { $$ = new Aritmeticas.default(Aritmeticas.Operadores.RESTA, @1.first_line, @1.first_column, $1, $3)}
    | expresion '*' expresion   { $$ = new Aritmeticas.default(Aritmeticas.Operadores.MUL, @1.first_line, @1.first_column, $1, $3)}
    | expresion '/' expresion   { $$ = new Aritmeticas.default(Aritmeticas.Operadores.DIV, @1.first_line, @1.first_column, $1, $3)}
    | expresion '%' expresion   { $$ = new Aritmeticas.default(Aritmeticas.Operadores.MOD, @1.first_line, @1.first_column, $1, $3)}
    | expresion '^' expresion   { $$ = new Aritmeticas.default(Aritmeticas.Operadores.POW, @1.first_line, @1.first_column, $1, $3)}
    | ENTERO_VALOR              { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.ENTERO), $1, @1.first_line, @1.first_column)}
    | DECIMAL_VALOR             { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.DECIMAL), $1, @1.first_line, @1.first_column)}
    | CADENAS_VALOR             { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.CADENA), $1, @1.first_line, @1.first_column)}
    | CARACTER_VALOR            { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.CARACTER), $1, @1.first_line, @1.first_column)}
    | TRUE                      { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.BOOLEANO), $1, @1.first_line, @1.first_column)}
    | FALSE                     { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.BOOLEANO), $1, @1.first_line, @1.first_column)}
    | IDENTIFICADOR             { $$ = new AccesoVariable.default($1, @1.first_line, @1.first_column)}
    | PARENTESIS_ABRIR expresion PARENTESIS_CERRAR  { $$ = $2 }
    | casteo                    { $$ = $1 }
    | aumentos                  { $$ = $1 }
    | acceso_a_listas           { $$ = $1 } // Acceso a listas
    | hacer_minuscula           { $$ = $1 } // Llamada a función minuscula
    | hacer_mayuscula           { $$ = $1 } // Llamada a función mayuscula
    | hacer_longitud            { $$ = $1 } // Llamada a función longitud
    | hacer_truncar             { $$ = $1 } // Llamada a función truncar
    | hacer_redondear           { $$ = $1 } // Llamada a función redondear
    | averiguar_tipo            { $$ = $1 } // Llamada a función tipo
    | llamada_funcion           { $$ = $1 } // Llamada a función
;

//**********************LISTAS**************************
//---------------------LISTA PARAMETROS---------------------
lista_parametros : lista_parametros COMA parametro_aux      { $$ = [...$1, $3]; }
                | parametro_aux                             { $$ = [$1]; }
;

parametro_aux : IDENTIFICADOR tipo_dato                 { $$ = { id: [$1], tipo: $2 }; }
;
//---------------------LISTA EXPRESIONES---------------------
lista_expresiones : lista_expresiones COMA expresion    { $$ = [...$1, $3]; }
                | expresion                             { $$ = [$1]; }
;

//**********************EXTRAS**************************
aumentos : IDENTIFICADOR INCREMEENTO
{ $$ = new IncrementoDecremento.default($1, @1.first_line, @1.first_column, "mas");}
            | IDENTIFICADOR DECREMEENTO
{ $$ = new IncrementoDecremento.default($1, @1.first_line, @1.first_column, "menos");}
;

%%
