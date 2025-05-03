``` bnf

<inicio> ::= <instrucciones> EOF
;

<instrucciones> ::= <instrucciones> <instruccion>
                | <instruccion>
;

<instruccion> ::= <declaraciones>
            | <asignacion_o_metodo_objeto>
            | <casteo>
            | <incrementar_o_decrementar>
            | <declaracion_listas>
            | <acceso_a_listas>
            | <condicion_si>
            | <seleccion_multiple>
            | <ciclo_para>
            | <ciclo_mientras>
            | <ciclo_repetir_hasta>
            | <sentencias_de_transferencia>
            | <funciones>
            | <procedimientos>
            | <llamada_procedimiento>
            | <objetos>
            | <instanciacion_objetos>
            | <objetos_accesos_metodos>
            | <impresion>
            | <hacer_minuscula>
            | <hacer_mayuscula>
            | <hacer_longitud>
            | <hacer_truncar>
            | <hacer_redondear>
            | <averiguar_tipo>
            | <aumentos>
            | error
;

//**************************DECLARACIONES**************************

<declaraciones> ::= INGRESAR <identificadores_multiples> COMO <tipo_dato> <con_valor_o_sin_valor>
;

<con_valor_o_sin_valor> ::= CON_VALOR <lista_expresiones>
                    |
;

<identificadores_multiples> ::= <identificadores_multiples> COMA IDENTIFICADOR
                | IDENTIFICADOR
;

//**************************ASIGNACION DE VARIABLES/METODOS DE OBJETOS**************************
<asignacion_o_metodo_objeto> ::= <identificadores_multiples> ARROW <continuacion_arrow>
;

<continuacion_arrow> ::= METODO IDENTIFICADOR <fin_con_parametros_o_sin> FIN_METODO
                   | <lista_expresiones>
;

//**************************CASTEOS**************************
<casteo> ::= PARENTESIS_ABRIR <tipo_dato> PARENTESIS_CERRAR <expresion>
;

//**************************INCREMENTO Y DECREMENTO**************************
<incrementar_o_decrementar> ::= <increment_or_decrement> PARENTESIS_ABRIR <expresion> PARENTESIS_CERRAR
;

<increment_or_decrement> ::= INCREMENTO
                    | DECREMENTO
;

//*******************DECLARACION LISTAS**************************
//---------------------DECLARCION LISTA UNIDIMENSIONAL---------------------
<declaracion_listas> ::= INGRESAR LISTA PARENTESIS_ABRIR <expresion> COMA <tipo_dato> PARENTESIS_CERRAR IDENTIFICADOR ARROW <tipo_de_lista_para_listas>
;

//---------------------DECLARCION TIPO DE LISTAS---------------------
<tipo_de_lista_para_listas> ::= <lista_ud>
                | <lista_bd_aux>
                | <lista_td_aux>
;

//---------------------LISTA PARA LISTAS UNIDIMENSIONAL---------------------
<lista_ud> ::= PARENTESIS_ABRIR <lista_expresiones> PARENTESIS_CERRAR
;

//---------------------LISTA PARA LISTAS BIDIMENSIONAL---------------------
<lista_bd_contenido> ::= <lista_bd_contenido> COMA <lista_ud>
                    | <lista_ud>
;

<lista_bd_aux> ::= PARENTESIS_ABRIR <lista_bd_contenido> PARENTESIS_CERRAR
;

//---------------------LISTA PARA LISTAS TRIDIMENSIONAL---------------------
<lista_td_contenido> ::= <lista_td_contenido> COMA <lista_bd_aux>
                    | <lista_bd_aux>
;

<lista_td_aux> ::= PARENTESIS_ABRIR <lista_td_contenido> PARENTESIS_CERRAR
;

//*******************ACCESO A LISTAS**************************
<acceso_a_listas> ::= IDENTIFICADOR <indices_de_listas> <modificar_lista>
;

<indices_de_listas> ::= <indices_de_listas> <indice_lista>
                | <indice_lista>
;

<indice_lista> ::= CORCHIN <expresion> CORCHFIN
;

//----------------------MODIFICACION DE LISTAS---------------------
<modificar_lista> ::= IGUAL_SIMPLE <expresion>
                |
;

//**************************CONDICIONALES**************************
//---------------------IF/SI---------------------
<condicion_si> ::= SI expresion ENTONCES <instrucciones> <continuacion_si>
;

<continuacion_si> ::= FIN_SI
        | DE_LO_CONTRARIO <instrucciones> FIN_SI
        | O_SI <expresion> ENTONCES <instrucciones> <continuacion_si>
;

//**************************SELECCION MULTIPLE**************************
//---------------------SWITCH CASE/ SELECCION MULTIPLE---------------------
<seleccion_multiple> ::= SEGUN <expresion> HACER <cases_con_default> FIN_SEGUN
;

<cases_con_default> ::= <cases_list> <default_case>
            | <cases_list>
            | <default_case>
;

<cases_list> ::= <cases_list> <case_simple>
            | <case_simple>
;

<case_simple> ::= EN_CASO_DE_SER <expresion> ENTONCES <instrucciones>
;

<default_case> ::= DE_LO_CONTRARIO_ENTONCES <instrucciones>
;

//**************************FOR/ CICLO PARA**************************
//---------------------FOR/ CICLO PARA---------------------
<ciclo_para> ::= PARA IDENTIFICADOR ARROW <expresion> HASTA <expresion> <salto_para> HACER <instrucciones> FIN_PARA
;

<salto_para> ::= CON_INCREMENTO <incremento_op>
            | CON_DECREMENTO <incremento_op>
;

<incremento_op> ::= <aumentos>
    | <asignacion_simple>
;

<asignacion_simple> ::= IDENTIFICADOR ARROW <expresion>
;

//**************************SENTENCIAS DE TRANSFERENCIA/ SENTENCIAS DE ESCAPE**************************
<sentencias_de_transferencia> ::= DETENER
                            | CONTINUAR
                            | RETORNAR
                            | RETORNAR <expresion>
;

//**************************FUCNIONES**************************
//---------------------FUNCIONES/ METODOS CON RETORNO---------------------
<funciones> ::= FUNCION IDENTIFICADOR <tipo_dato> <proce_o_func_con_parametros_o_sin> FIN_FUNCION
;

<procedimientos> ::= PROCEDIMIENTO IDENTIFICADOR <proce_o_func_con_parametros_o_sin> FIN_PROCEDIMIENTO
;

<proce_o_func_con_parametros_o_sin> ::= CON_PARAMETROS PARENTESIS_ABRIR <lista_parametros> PARENTESIS_CERRAR <instrucciones>
                                    | <instrucciones>
;

//---------------------LLAMADA DE FUNCIONES/ PROCEDIMIENTOS---------------------
<llamada_procedimiento> ::= EJECUTAR IDENTIFICADOR PARENTESIS_ABRIR <lista_expresiones_o_no> PARENTESIS_CERRAR
;

<lista_expresiones_o_no> ::= <lista_expresiones>
                |
;

<llamada_funcion> ::= IDENTIFICADOR PARENTESIS_ABRIR <lista_expresiones_o_no> PARENTESIS_CERRAR
;

//**************************OBJETOS**************************
//---------------------CREACION---------------------
<objetos> ::= OBJETO IDENTIFICADOR PARENTESIS_ABRIR <atributos> PARENTESIS_CERRAR
;

//---------------------ATRIBUTOS---------------------
<atributos> ::= <atributos> <atributo>
            | <atributo>
;

<atributo> ::= IDENTIFICADOR <tipo_dato>
;

//---------------------METODOS---------------------
<fin_con_parametros_o_sin> ::= <instrucciones>
                | CON_PARAMETROS PARENTESIS_ABRIR <lista_parametros> PARENTESIS_CERRAR <instrucciones>
;

//---------------------INSTANCIACION---------------------
<instanciacion_objetos> ::= INGRESAR OBJETO IDENTIFICADOR IDENTIFICADOR ARROW IDENTIFICADOR PARENTESIS_ABRIR <lista_expresiones> PARENTESIS_CERRAR
;

//---------------------ACCESO A ATRIBUTOS Y METODOS DE OBJETOS---------------------
<objetos_accesos_metodos> ::= IDENTIFICADOR PUNTO IDENTIFICADOR
                        | EJECUTAR IDENTIFICADOR PUNTO IDENTIFICADOR PARENTESIS_ABRIR <con_lista_o_sin> PARENTESIS_CERRAR
;

<con_lista_o_sin> ::= <lista_expresiones>
                |
;

//******************IMPRIMIR**************************
<impresion> ::= IMPRIMIR <expresion>
            | IMPRIMIR NUEVALINEA <expresion>
;

//*******************FUNCIONES NATIVAS**************************
//---------------------MINUSCULA---------------------
<hacer_minuscula> ::= MINUSCULA PARENTESIS_ABRIR <expresion> PARENTESIS_CERRAR
;

//---------------------MAYUSCULA---------------------
<hacer_mayuscula> ::= MAYUSCULA PARENTESIS_ABRIR <expresion> PARENTESIS_CERRAR
;

//---------------------LONGITUD---------------------
<hacer_longitud> ::= LONGITUD PARENTESIS_ABRIR <expresion> PARENTESIS_CERRAR
;

//---------------------TRUNCAR---------------------
<hacer_truncar> ::= TRUNCAR PARENTESIS_ABRIR > PARENTESIS_CERRAR
;

//---------------------REDONDEAR---------------------
<hacer_redondear> ::= REDONDEAR PARENTESIS_ABRIR <expresion> PARENTESIS_CERRAR
;

//---------------------TIPO---------------------
<averiguar_tipo> ::= TIPO PARENTESIS_ABRIR <expresion> PARENTESIS_CERRAR
;

//**************************TIPOS DE DATOS**************************
//---------------------TIPOS DE DATOS---------------------
<tipo_dato> ::= ENTERO
            | DECIMAL
            | CARACTER
            | BOOLEANO
            | CADENA
;

//**************************EXPRESIONES**************************
//---------------------EXPRESIONES--------------------------
<expresion> ::= '-' <expresion>
    | '!' <expresion>
    | <expresion> '||' <expresion>
    | <expresion> '&&' <expresion>
    | <expresion> '==' <expresion>
    | <expresion> '!=' <expresion>
    | <expresion> '>=' <expresion>
    | <expresion> '<=' <expresion>
    | <expresion> MENOR <expresion>
    | <expresion> MAYOR <expresion>
    | <expresion> '+' <expresion>
    | <expresion> '-' <expresion>
    | <expresion> '*' <expresion>
    | <expresion> '/' <expresion>
    | <expresion> '%' <expresion>
    | <expresion> '^' <expresion>
    | ENTERO_VALOR
    | DECIMAL_VALOR
    | CADENAS_VALOR
    | CARACTER_VALOR
    | TRUE
    | FALSE
    | IDENTIFICADOR
    | PARENTESIS_ABRIR <expresion> PARENTESIS_CERRAR
    | <casteo>
    | <aumentos>
    | <acceso_a_listas>
    | <hacer_minuscula>
    | <hacer_mayuscula>
    | <hacer_longitud>
    | <hacer_truncar>
    | <hacer_redondear>
    | <averiguar_tipo>
    | <llamada_funcion>
;

//**********************LISTAS**************************
//---------------------LISTA PARAMETROS---------------------
<lista_parametros> ::= <lista_parametros> COMA <parametro_aux>
                | <parametro_aux>
;

<parametro_aux> ::= IDENTIFICADOR <tipo_dato>
;

//---------------------LISTA EXPRESIONES---------------------
<lista_expresiones> ::= <lista_expresiones> COMA <expresion>
                | <expresion>
;

//**********************EXTRAS**************************
<aumentos> ::= IDENTIFICADOR INCREMEENTO
            | IDENTIFICADOR DECREMEENTO
;

```