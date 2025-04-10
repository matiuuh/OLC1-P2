%{
// Aquí se incluyen las acciones semánticas de JavaScript necesarias.

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
"entero"                        return 'ENTERO'
"decimal"                       return 'DECIMAL'
"caracter"                      return 'CARACTER'
"boolean"                       return 'BOOLEANO'
"cadena"                        return 'CADENA'

//-----------------OPERADORES LOGICOS-----------------
"!"                             return 'NOT'
"||"                            return 'OR'
"&&"                            return 'AND'

//-----------------OPERACIONES-----------------
//-----------------NIVEL 0-----------------
"-"                             return 'MENOS'
//-----------------NIVEL 1-----------------
"^"                             return 'POTENCIA'
//-----------------NIVEL 2-----------------
"*"                             return 'MULTIPLICACION'
"/"                             return 'DIVISION'
"%"                             return 'MODULO'
//-----------------NIVEL 3-----------------
"+"                             return 'SUMA'
//"-"                            return 'RESTA'
//-----------------NIVEL 4-----------------
"=="                            return 'IGUAL_IGUAL'
"!="                            return 'DIFERENTE'
"<"                             return 'MENOR_QUE'
"<="                            return 'MENOR_IGUAL'
">"                             return 'MAYOR_QUE'
">="                            return 'MAYOR_IGUAL'
//------------------NIVEL 5-----------------
"!="                            return 'NOT_IGUAL'
//------------------NIVEL 6-----------------
"&&"                            return 'AND'
//-------------------NIVEL 7-----------------
"||"                            return 'OR'

//-------------------PALABRAS RESERVADAS-----------------
"ingresar"                      return 'INGRESAR'
"como"                          return 'COMO'
"con valor"                     return 'CON_VALOR'

//-----------------CONDICIONALES-----------------
"si"                            return 'SI'
"entonces"                      return 'ENTONCES'
"fin si"                        return 'FIN_SI'
"de lo contrario"               return 'DE_LO_CONTRARIO'
"o si"                          return 'O_SI'
//-----------------SELECCION MULTIPLE-----------------
"segun"                         return 'SEGUN'
"hacer"                         return 'HACER'
"en caso de ser"                return 'EN_CASO_DE_SER'
"detener"                       return 'DETENER'
"fin segun"                     return 'FIN_SEGUN'
"de lo contrario entonces"      return 'DE_LO_CONTRARIO_ENTONCES'

//**************************CICLOS**************************
//-----------------FOR-----------------
"para"                          return 'PARA'
"hasta"                         return 'HASTA'
"con incremento"                return 'CON_INCREMENTO'
"con decremento"                return 'CON_DECREMENTO'
"fin para"                      return 'FIN_PARA'

//-----------------WHILE-----------------
"mientras"                      return 'MIENTRAS'
"fin mientras"                  return 'FIN_MIENTRAS'

//-----------------DO WHILE-----------------
"repetir"                       return 'REPETIR'
"hasta que"                     return 'HASTA_QUE'

//*****************SENTENCIAS DE TRANSFERENCIA******************
"detener"                       return 'DETENER'
"continuar"                     return 'CONTINUAR'
"retonar"                       return 'RETORNAR'

//*******************************METODOS*******************************
//--------------------FUNCIONES/ METODOS CON RETORNO--------------------
"funcion"                       return 'FUNCION'
"fin funcion"                   return 'FIN_FUNCION'
"con parametros"                return 'CON_PARAMETROS'

//--------------------PROCEDIMIENTOS/ METODOS SIN RETORNO--------------------
"procedimiento"                 return 'PROCEDIMIENTO'
"fin procedimiento"             return 'FIN_PROCEDIMIENTO'

//-----------------LLAMADA DE PROCEDIMIENTOS Y FUNCIONES-----------------
"ejecutar"                      return 'EJECUTAR'

//*******************************OBJETOS*******************************
//-----------------OBJETOS-----------------
"objeto"                        return 'OBJETO'

//-----------------METODOS-----------------
"metodo"                        return 'METODO'
"fin metodo"                    return 'FIN_METODO'

//----------------IMPRIMIR----------------
"imprimir"                      return 'IMPRIMIR'

//*******************************FUNCIONES NATIVAS*******************************
"minuscula"                     return 'MINUSCULA'
"mayuscula"                     return 'MAYUSCULA'
"longitud"                      return 'LONGITUD'
"truncar"                       return 'TRUNCAR'
"redondear"                     return 'REDONDEAR'
"tipo"                          return 'TIPO'


"inc"                           return 'INCREMENTO'
"dec"                           return 'DECREMENTO'

"Lista"                         return 'LISTA'

//-----------------SIGNOS-----------------
"->"                        return 'ARROW'
"‘"                         return 'TILDE_IZQUIERDA'
"’"                         return 'TILDE_DERECHA'
"/""                        return 'COMILLAS'
"["                         return 'CORCHETE_ABRIR'
"]"                         return 'CORCHETE_CERRAR'
"("                         return 'PARENTESIS_ABRIR'
")"                         return 'PARENTESIS_CERRAR'
"{"                         return 'LLAVE_ABRIR'
"}"                         return 'LLAVE_CERRAR'
";"                         return 'PUNTOYCOMA'
":"                         return 'DOSPUNTOS'
","                         return 'COMA'
"++"                        return 'MAS_MAS'
"--"                        return 'MENOS_MENOS'
"."                         return 'PUNTO'

"false"                     return 'FALSE'
"true"                      return 'TRUE'

"=="                        return 'IGUAL_IGUAL'
"="                         return 'IGUAL'
"!="                        return 'DISTINTO'
"<="                        return 'MENOR_IGUAL'
">="                        return 'MAYOR_IGUAL'
"<"                         return 'MENOR_QUE'
">"                         return 'MAYOR_QUE'

[0-9]+"."[0-9]+             return "DECIMAL"
[0-9]+                      return "ENTERO"

//Texto con o sin secuancias de escape
["]                               { cadena=""; this.begin("stringss"); }
<stringss>[^"\\]+                 { cadena+=yytext; }
<stringss>"\\\""                  { cadena+="\""; }
<stringss>"\\n"                   { cadena+="\n"; }
<stringss>\s                      { cadena+=" ";  }
<stringss>"\\t"                   { cadena+="\t"; }
<stringss>"\\\\"                  { cadena+="\\"; }
<stringss>"\\'"                   { cadena+="\'"; } //le quite un \ recoradat
<stringss>["]                     { yytext=cadena; this.popState(); return 'TEXTO'; }

//----------------char con o sin secuancias de escape----------------
[']                             { caracter=""; this.begin("caracter"); }
<caracter>[^'\\]+                 { caracter=yytext; }
<caracter>"\\\""                  { caracter="\""; }
<caracter>"\\n"                   { caracter="\n"; }
<caracter>\s                      { caracter=" ";  }
<caracter>"\\t"                   { caracter="\t"; }
<caracter>"\\\\"                  { caracter="\\"; }
<caracter>"\\'"                   { caracter="\'"; } //le quite un \ recoradat
<caracter>[']                     { yytext=caracter; this.popState(); return 'CHAR'; }

[a-zA-Z][a-zA-Z0-9_]*       return "IDENTIFICADOR"

//ignorar espacios en blanco
[\ \r\t\f\n]+           {};

.                       { console.log("Error lexico: "+yytext);}
//fin de cadena
<<EOF>>                 return 'EOF'

//aca inicia la parte del analisis sintactico
%{
    //Aca tambien puedo agregar codigo en javascript
%}

//directiva lex
/lex

%left '+' '-'
%left '*' '/'
%right '^'
%nonassoc '<' '>' '==' '!=' '<=' '>='
%right '!'
%left 'AND'
%left 'OR'

%%

//Simbolo inicial
%start inicio

%%

inicio : instrucciones EOF
;

instrucciones : instrucciones instruccion
                | instruccion
;

instruccion : declaracion_sencilla
            | declaracion_multiple
            | asignacion
            | casteo
            | incrementar
            | decrementar
            | listas
            | condicion_si
            | seleccion_multiple
            | ciclo_para
            | ciclo_mientras
            | ciclo_repetir_hasta
            | sentencias_de_transferencia
            | funciones
            | procedimientos
            | llamada_funcion
            | objetos
            | metodo_objeto
            | instanciacion_objetos
            | error PUNTOYCOMA
            | error LLAVE_C
;

//**************************DECLARACIONES**************************
declaracion_sencilla : INGRESAR IDENTIFICADOR COMO tipo_dato CON_VALOR expresion
                    | INGRESAR IDENTIFICADOR COMO tipo_dato
;

declaracion_multiple : INGRESAR lista_variables COMO tipo_dato CON_VALOR lista_expresiones
                    | INGRESAR lista_variables COMO tipo_dato
;

//**************************ASIGNACION DE VARIABLES**************************
asignacion : IDENTIFICADOR ARROW expresion
            | lista_variables ARROW lista_expresiones
;

//**************************CASTEOS**************************
casteo : PARENTESIS_ABRIR tipo_dato PARENTESIS_CERRAR expresion
;

//**************************INCREMENTO Y DECREMENTO**************************
incrementar : INCREMENTO PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

decrementar : DECREMENTO PARENTESIS_ABRIR expresion PARENTESIS_CERRAR
;

//**************************LISTAS**************************
listas : INGRESAR LISTA PARENTESIS_ABRIR dimensiones COMA tipo_dato PARENTESIS_CERRAR IDENTIFICADOR ARROW PARENTESIS_ABRIR lista_valores
;//revisar la lista de valores

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

fin_condicion_si : DE_LO_CONTRARIO instrucciones FIN_SI
    | O_SI instrucciones fin_condicion_si
;

//**************************SELECCION MULTIPLE**************************
//---------------------SWITCH CASE/ SELECCION MULTIPLE---------------------
seleccion_multiple : SEGUN expresion opciones FIN_SEGUN
;

opciones : opciones seleccion
        | seleccion
;

seleccion : expresion HACER EN_CASO_DE_SER expresion ENTONCES instrucciones
;

//**************************FOR/ CICLO PARA**************************
ciclo_para : PARA IDENTIFICADOR ARROW expresion HASTA expresion CON_INCREMENTO IDENTIFICADOR MAS_MAS HACER instrucciones FIN_PARA
        | PARA IDENTIFICADOR ARROW expresion HASTA expresion CON_DECREMENTO IDENTIFICADOR MENOS_MENOS HACER instrucciones FIN_PARA
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
instanciacion_objetos : INGRESAR OBJETO IDENTIFICADOR IDENTIFICADOR ARROW IDENTIFICADOR PARENTESIS_ABRIR lista_valores PARENTESIS_CERRAR
;

//**************************TIPOS DE DATOS**************************
//---------------------TIPOS DE DATOS---------------------
tipo_dato : ENTERO
            | DECIMAL
            | CARACTER
            | BOOLEANO
            | CADENA
            //| LISTA
;

//**************************EXPRESIONES**************************
//---------------------EXPRESIONES---------------------
expresion : expresion '+' expresion
            | expresion '-' expresion
            | expresion '*' expresion
            | expresion '/' expresion
            | expresion '%' expresion
            | expresion '^' expresion
            | '-' expresion %prec MENOS
            | '+' expresion %prec MAS
            | '!' expresion %prec NOT
            | '(' expresion ')'
            | IDENTIFICADOR
            | ENTERO
            | DECIMAL
            | CADENA
            | CHAR
            | TRUE
            | FALSE
;

//**********************LISTAS**************************
//---------------------LISTA VALORES---------------------
lista_valores : lista_valores COMA expresion
            | expresion
;

%%
