%{
// Aquí se incluyen las acciones semánticas de JavaScript necesarias.
const Aritmeticas = require('./expresiones/Aritmeticas')
const Nativo = require('./Expresiones/Nativo')
const Tipo = require('./Simbolo/Tipo')

const Declaracion = require('./Instrucciones/Declaracion')

//variables para la cadena:
    let cadena="";
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
"\""                        return 'COMILLAS';
"("                         return 'PARENTESIS_ABRIR';
")"                         return 'PARENTESIS_CERRAR';
//":"                         return 'DOSPUNTOS';
","                         return 'COMA';
"++"                        return '++';
"--"                        return '--';
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
["]                               { cadena=""; this.begin("stringss"); }
<stringss>[^"\\]+                 { cadena+=yytext; }
<stringss>"\\\""                  { cadena+="\""; }
<stringss>"\\n"                   { cadena+="\n"; }
<stringss>\s                      { cadena+=" ";  }
<stringss>"\\t"                   { cadena+="\t"; }
<stringss>"\\\\"                  { cadena+="\\"; }
<stringss>"\\'"                   { cadena+="\'"; }
<stringss>["]                     { yytext=cadena; this.popState(); return 'CADENAS_VALOR'; }

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
            | asignacion                    {$$ = $1;}
            | casteo                        {$$ = $1;}
            | incrementar                   {$$ = $1;}
            | decrementar                   {$$ = $1;}
            | tipo_de_lista_para_listas     {$$ = $1;}
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
            | metodo_objeto                 {$$ = $1;}
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
;

con_valor_o_sin_valor : CON_VALOR lista_expresiones
                | /* nada */
;

//**************************ASIGNACION DE VARIABLES**************************
asignacion : identificadores_multiples ARROW lista_expresiones
;

identificadores_multiples : identificadores_multiples COMA IDENTIFICADOR
                | IDENTIFICADOR
;

//**************************CASTEOS**************************
casteo : PARENTESIS_ABRIR tipo_dato PARENTESIS_CERRAR expresion
;

//**************************INCREMENTO Y DECREMENTO**************************
incrementar : INCREMENTO PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

decrementar : DECREMENTO PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

//*******************DECLARACION LISTAS**************************
//---------------------DECLARCION LISTA UNIDIMENSIONAL---------------------
declaracion_listas : INGRESAR LISTA PARENTESIS_ABRIR expresion COMA tipo_dato PARENTESIS_CERRAR IDENTIFICADOR ARROW tipo_de_lista_para_listas
;

//---------------------DECLARCION TIPO DE LISTAS---------------------
tipo_de_lista_para_listas : lista_ud
                | lista_bd
                | lista_td
;

//---------------------LISTA PARA LISTAS UNIDIMENSIONAL---------------------
lista_ud : PARENTESIS_ABRIR lista_expresiones PARENTESIS_CERRAR
;

//---------------------LISTA PARA LISTAS BIDIMENSIONAL---------------------
lista_bd : lista_para_listas_bd COMA lista_para_listas_ud
        | lista_para_listas_ud
;

//---------------------LISTA PARA LISTAS TRIDIMENSIONAL---------------------
lista_td : lista_para_listas_td COMA lista_para_listas_bd
        | lista_para_listas_bd
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
condicion_si : SI expresion ENTONCES instrucciones FIN_SI
            | SI expresion ENTONCES instrucciones fin_condicion_si
;

aux : fin_condicion_si
    | FIN_SI
;

fin_condicion_si : DE_LO_CONTRARIO instrucciones FIN_SI
                | O_SI instrucciones fin_condicion_si
;

//**************************SELECCION MULTIPLE**************************
//---------------------SWITCH CASE/ SELECCION MULTIPLE---------------------
seleccion_multiple : SEGUN expresion opciones DE_LO_CONTRARIO_ENTONCES instrucciones FIN_SEGUN
;

opciones : opciones seleccion
        | seleccion
;

seleccion : HACER EN_CASO_DE_SER expresion ENTONCES instrucciones
;

//**************************FOR/ CICLO PARA**************************
ciclo_para : PARA IDENTIFICADOR ARROW expresion HASTA expresion CON_INCREMENTO IDENTIFICADOR ++ HACER instrucciones FIN_PARA
        | PARA IDENTIFICADOR ARROW expresion HASTA expresion CON_DECREMENTO IDENTIFICADOR -- HACER instrucciones FIN_PARA
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
funciones : FUNCION IDENTIFICADOR tipo_dato CON_PARAMETROS PARENTESIS_ABRIR lista_parametros PARENTESIS_CERRAR instrucciones FIN_FUNCION
    | FUNCION IDENTIFICADOR tipo_dato instrucciones FIN_FUNCION
;

procedimientos : PROCEDIMIENTO IDENTIFICADOR CON_PARAMETROS PARENTESIS_ABRIR lista_parametros PARENTESIS_CERRAR instrucciones FIN_PROCEDIMIENTO
    | PROCEDIMIENTO IDENTIFICADOR instrucciones FIN_PROCEDIMIENTO
;

//---------------------LLAMADA DE FUNCIONES/ PROCEDIMIENTOS---------------------
llamada_funcion : EJECUTAR IDENTIFICADOR PARENTESIS_ABRIR lista_expresiones PARENTESIS_CERRAR
                | EJECUTAR IDENTIFICADOR PARENTESIS_ABRIR PARENTESIS_CERRAR
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
metodo_objeto : IDENTIFICADOR ARROW METODO IDENTIFICADOR instrucciones FIN_METODO
            | IDENTIFICADOR ARROW METODO IDENTIFICADOR CON_PARAMETROS PARENTESIS_ABRIR lista_parametros PARENTESIS_CERRAR instrucciones FIN_PROCEDIMIENTO
;

//---------------------INSTANCIACION---------------------
instanciacion_objetos : INGRESAR OBJETO IDENTIFICADOR IDENTIFICADOR ARROW IDENTIFICADOR PARENTESIS_ABRIR lista_expresiones PARENTESIS_CERRAR
;

//---------------------ACCESO A ATRIBUTOS Y METODOS DE OBJETOS---------------------
objetos_accesos_metodos : IDENTIFICADOR PUNTO IDENTIFICADOR
                        | EJECUTAR IDENTIFICADOR PUNTO IDENTIFICADOR PARENTESIS_ABRIR PARENTESIS_CERRAR
                        | EJECUTAR IDENTIFICADOR PUNTO IDENTIFICADOR PARENTESIS_ABRIR lista_expresiones PARENTESIS_CERRAR
;

//******************IMPRIMIR**************************
impresion : IMPRIMIR expresion
            | IMPRIMIR NUEVALINEA expresion
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
expresion: '-' expresion %prec UMENOS
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
    | ENTERO_VALOR              { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.ENTERO), $1, @1.first_line, @1.first_column) }
    | DECIMAL_VALOR             { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.DECIMAL), $1, @1.first_line, @1.first_column) }
    | CADENAS_VALOR             { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.CADENA), $1, @1.first_line, @1.first_column) }
    | CARACTER_VALOR            { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.CARACTER), $1, @1.first_line, @1.first_column) }
    | TRUE                      { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.BOOLEANO), $1, @1.first_line, @1.first_column) }
    | FALSE                     { $$ = new Nativo.default(new Tipo.default(Tipo.tipo_dato.BOOLEANO), $1, @1.first_line, @1.first_column) }
    | IDENTIFICADOR
    | PARENTESIS_ABRIR expresion PARENTESIS_CERRAR  { $$ = $2 }
    | casteo
;

//**********************LISTAS**************************
//---------------------LISTA PARAMETROS---------------------
lista_parametros : lista_parametros COMA IDENTIFICADOR tipo_dato
                | IDENTIFICADOR tipo_dato
;

//---------------------LISTA EXPRESIONES---------------------
lista_expresiones : lista_expresiones COMA expresion
                | expresion
;

%%
