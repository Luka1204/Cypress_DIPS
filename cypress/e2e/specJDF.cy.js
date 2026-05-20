@extends('layouts.base')

@section('titulo', 'Administracion de citaciones')

@section('titulonavbar', 'El mejor sistema de todos')

@section('nombresitio', 'Municipalidad de Morón')

@section('saidbar')

@endsection

@section('content')

<div class="div" data-app id="reincidencias">
    <p hidden id="user">{{Auth::user()->username}}</p>
    <div class="card border-dark">
        <div class="card-body">
            <div class="row">    
				<div class="col col-md-4">
                    <strong> Tipo de Acta:</strong>
					<v-select
						v-model="tipoActa"
						:items="tiposActa"
						item-text="Desc_Tipo_Infraccion"
						item-value="Cod_Tipo_Infraccion"
						chips
						label="Tipo de Busqueda"          
						solo
						></v-select>
                </div>
				<div class="col col-md-4">
                    <strong> Nro Acta:</strong>
                    <v-text-field
                        type="text"
                        label="Nro de acta"
                        placeholder=""
                        solo
                        v-model="Nro_Acta"						          		    
                        id="Nro_Acta"
						v-on:keyup.enter="habilitoBusqueda()"
                        ></v-text-field>									
                </div>
                <div class="col col-md-4 pull-right">
                    <br>
                    <button type="button" class="btn btn-primary" @click="habilitoBusqueda()">Buscar</button>
                </div>
            </div>
			<div class="row">
				<div class="col-lg-6">
					<button class="btn btn-danger" @click="vistaReincidenciasExternas()" :disabled = "this.generoCausaOK">Reincidencias Externas</button>
				</div>
				<div class="col-lg-6" v-if="!busquedaManualOK && !estadoPermitido">
					<h2 class="text-danger"><strong>Reincidencias ya buscadas</strong></h2>
				</div>
			</div>  
        </div>	
    </div>		
    <br>
    <div v-if="vistaExternas" class="card my-3 border-dark">
        <div class="card-body">
            <div class="container-fluid ">
                <div class="row">
                    <v-text-field solo v-model="reincidenciasExternas.Nro_Acta" solo label="Numero"></v-text-field>
                </div>
                <div class="row">
                    <v-autocomplete :items="tiposActa" 
                                item-text="Desc_Tipo_Infraccion" 
                                item-value="Cod_Tipo_Infraccion" 
                                chips
                                label="Tipo de Busqueda"          
                                 v-model="reincidenciasExternas.CodTipo_Infraccion" solo label="Tipo" @change="cargarArticulosTotales()"></v-autocomplete>
                </div>
                <div class="row">
                    <v-text-field type="date" v-model="reincidenciasExternas.Fecha_Infraccion"></v-text-field>
                </div>
                <div class="row">
                    <v-text-field v-model="reincidenciasExternas.Localidad" label="Localidad" solo></v-text-field>
                </div>
                <div class="row">
                    <v-text-field label="Articulos" v-model="reincidenciasExternas.Articulos"></v-text-field>
                </div>
                <div class="row">
                    <v-textarea outlined v-model="reincidenciasExternas.observacion"></v-textarea>
                </div>
                <div class="row">
                    <v-btn color="green" class="text-white" @click="agregarReincidenciaExterna()">Agregar Reinc.</v-btn>
                </div>
            </div>
        </div>
    </div>
    <br>
    <div v-if="busquedaManualOK" class="card my-3 border-dark">
        <div class="card-body">
            <div class="container-fluid" >
                <div class="row">
                    <div class="container">
						<div class="row">
							<div class="col col-sm-10">
								<p><strong>Ingrese el tipo de búsqueda:</strong></p>
								<v-select
								v-model="tipoBusquedaModalReincidencia"
								:items="tiposBusquedaModalReincidencia"
								item-text="text"
								item-value="value"
								chips
								label="Tipo de Busqueda"          
								solo
								></v-select>
								<div v-show="tipoBusquedaModalReincidencia == 1">
									<div class="row">
										<div class="col">
											<strong>Nombre:</strong>
											<v-text-field 
												type="text"
												label="Nombre"
												placeholder="Ingrese el nombre"
												solo
												v-model="busquedaReincidencia.nombre"
												id="busquedaReincidencianombre"
												v-on:keyup.enter="cargarTablaXBusqueda"	
											></v-text-field >
										</div>
										<div class="col">
											<strong>Apellido:</strong>
											<v-text-field 
												type="text"
												label="Apellido"
												placeholder="Ingrese el apellido"
												solo
												v-model="busquedaReincidencia.apellido"
												id="busquedaReincidenciaApellido"
												v-on:keyup.enter="cargarTablaXBusqueda"	
											></v-text-field >
										</div>
									</div>
								</div>
								<div v-show="tipoBusquedaModalReincidencia == 2">
									<div class="row">
										<div class="col">
											<strong>Tipo doc:</strong>
											<v-select
												v-model="busquedaReincidencia.tipoDoc"
												:items="tipoDocumentos"
												item-text="Desc_Tipo_Documento"							
												item-value="Desc_Tipo_Documento"
												chips
												label="Tipo Documento"            
												solo
											></v-select>
										</div>
										<div class="col">
											<strong>Nro:</strong>
											<v-text-field 
											type="text"
											label="Nro Documento"
											placeholder="Ingrese el Nro"
											solo
											v-model="busquedaReincidencia.nroDoc"
											v-on:keyup.enter="cargarTablaXBusqueda"					
											></v-text-field >
										</div>
									</div>
								</div>
								<div v-show="tipoBusquedaModalReincidencia == 3">
									<strong>Razón social:</strong>
									<v-text-field 
									type="text"
										label="Razón Social"
										placeholder="Ingrese Razón social"
										solo
										v-model="busquedaReincidencia.razonSocial"
									></v-text-field >
								</div>
								<div v-show="tipoBusquedaModalReincidencia == 4">
									<strong>Dominio:</strong>
									<v-text-field 
										type="text"
										label="Dominio"
										placeholder="Ingrese el dominio"
										solo
										v-model="busquedaReincidencia.Dominio"
										v-on:keyup.enter="cargarTablaXBusqueda"	
									></v-text-field >
								</div>
								<div v-show="tipoBusquedaModalReincidencia == 5">
									<div class="row">
										<div class="col">
											<strong>Calle:</strong>
											<v-text-field 
												type="text"
												label="Calle"
												placeholder="Ingrese la calle "
												solo
												v-model="busquedaReincidencia.calle"
											></v-text-field >
										</div>
										<div class="col">
											<strong>Altura:</strong>
											<v-text-field 
												type="text"
												label="Calle"
												placeholder="Ingrese la calle "
												solo
												v-model="busquedaReincidencia.CalleAltura"
												v-on:keyup.enter="cargarTablaXBusqueda"	
											></v-text-field >
										</div>
									</div>
								</div>
							</div>
							<div class="col col-sm-2" style="display: flex; align-items: center; justify-content: center;">
								<div class="row">
									<button type="button" class="btn btn-primary" @click="cargarTablaXBusqueda">Buscar</button>
								</div>
							</div>
						</div>	                        
                        <div class="row">					
                            <div class="row">
                                <v-data-table :headers="headersInfractores" :items="infractores" :search="searchInfra" :no-results-text="noresultstext" :items-per-page-options="rowsPerPage" items-per-page-text="cant filas">
									<template v-slot:item.action="{ item }">
										<button class="btn btn-success" type="button" @click="buscarCausas(item.Id_Infractor)"><i class="fas fa-check"></i></button>                      
										<button class="btn btn-danger" type="button" @click="eliminarInfra(item)"><i class="fas fa-trash"></i></button>
									</template>
								</v-data-table>				
                            </div>
                        </div>
						<hr>
                    </div>
                    <div class="container">
                        <div class="row">
                            <h3>Actas del infractor:</h3>
                        </div>														
                        <div class="row">
                            <div class="row">
                                <div class="col">
                                    <button class="btn btn-outline-danger" @click="seleccionarTodo()">Seleccionar Todo</button>
                                </div>					
                            </div>		
							<v-data-table :headers="headersCausas" :items="rowsCausa" :search="searchInfra" :no-results-text="noresultstext" :items-per-page-options="rowsPerPage" items-per-page-text="cant filas">
								<template v-slot:item="props"  :no-results-text="noresultstext">
									<tr :bgcolor="props.item.FalloId != 0 ? '#e2d816' : '#fff'">
										<td>@{{props.item.IdCausa}}</td>
										<td>@{{props.item.Nro_Causa}}</td>
										<td>@{{props.item.Nro_Acta}}</td>
										<td>@{{props.item.CodTipo_Infraccion}}</td>
										<td>@{{props.item.Fecha_Infraccion.substr(0,10)}}</td>
										<td>@{{props.item.Nro_Juzgado}}</td>
										<td>@{{props.item.FalloTipo_DES}} Fec: (@{{props.item.FechaFallo.substr(0,10)}}) Imp:(@{{props.item.Importe}})</td>
										<td>
											<div v-if="props.item.reincide == true">
												<button class="btn btn-success" type="button" @click="agregarReincidencia(props.item.Nro_Acta,props.item.CodTipo_Infraccion)"><i class="fas fa-check"></i></button>
											</div>
											<div class="row" v-else>
												<p>No Reinc.</p>
											</div>
										</td>
									</tr>
								</template>
							</v-data-table>												
                        </div>
                    </div>
                    <hr>									
                </div>
            </div>
        </div>
    </div>
    <div style="overflow:scroll" class="card my-3 border-dark" v-if="busquedaManualOK">
        <div class="card-body">
            <div class="container-fluid">
                <div class="row">				
                    <h3>Reincidencias Encontradas:</h3>						
                    <div class="row">
                        <v-data-table :headers="headersReincidencias":items="rowsReincidencias" :search="searchInfra" :no-results-text="noresultstext" :items-per-page-options="rowsPerPage" items-per-page-text="cant filas">
							<template v-slot:item="props" :no-results-text="noresultstext">
									<tr>
										<td><button class="btn btn-danger" @click="eliminarReincidencia(props.item)">Eliminar</button></td>
										<td>@{{props.item.estado}}</td>
										<td>@{{props.item.Nro_Acta}}</td>
										<td>@{{props.item.CodTipo_Infraccion}}</td>
										<td>@{{props.item.Fecha_Infraccion}}</td>
										<td>@{{props.item.inf_nom}}</td>
										<td>@{{props.item.Nro_Juzgado}}</td>
										<td>@{{props.item.InfractorID}}</td>
										<td>@{{props.item.Localidad}}</td>
										<td>@{{props.item.Articulos}}</td>
										<td>@{{props.item.observacion}}</td>
										<td>@{{props.item.inf_doc}}</td>
										<td>@{{props.item.fallo_desc}}</td>
										<td>@{{props.item.fallo_fec}}</td>
										<td>@{{props.item.fallo_id}}</td>
										<td>@{{props.item.causa}}</td>
										<td>@{{props.item.Log_user}}</td>
										<td>@{{props.item.Log_date}}</td>
									</tr>
									
							</template>
							
						</v-data-table>		
						<div class="col">
							@include('actas.reincidencia.formImpresionReincidencia')
						</div>
						<div class="col">
							<button class="btn btn-primary" :disabled="!puedoGrabarReinc" @click="grabarReincidencias()">Grabar</button>
						</div>	
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row" v-if="busquedaManualOK">
        <div class="col">
            <button type="button" :disabled="generoCausaOK == false" class="btn btn-primary" @click="llamarGenerarCausa()" >Generar Causa </button>
        </div>
        @if(Auth::user()->tienePermiso('iniciarPV'))
        <div class="col ">
            <button type="button" :disabled="emitirPvOK == false"  class="btn btn-primary" @click="emitirPV()" >Emitir Pago Voluntario</button>					
        </div>
        @else
        <div class="col ">
            <button type="button" disabled  class="btn btn-primary">Emitir Pago Voluntario</button>					
        </div>
        @endif		
		<div class="col ">
			<button type="button" class="btn btn-primary" @click="limpiarBusquedaReincidencia">Limpiar</button>
		</div>			
    </div>
</div>


<script>
	reincidencias = new Vue({
		el: '#reincidencias',
		vuetify: new Vuetify(),
		data: {
            Nro_Acta:'',
            tiposActa:{!!$tiposActa!!},
            tipoActa:'',
            tipoBusquedaModalReincidencia:'',
            tiposBusquedaModalReincidencia:[],
            busquedaManualOK: false,
			dominioActa: '',
			fechaInfraccionActa:'',
			articulos:[],
			puedoGrabarReinc:false,
            busquedaReincidencia: {
                nombre:'',
                apellido:'',
                tipoDoc:'',
                nroDoc:'',
                razonSocial:'',
                Dominio:'',
                calle:'',
                CalleAltura:''
            },
            tipoDocumentos: {!!$tiposDocumentos!!}
            ,
			headersReincidencias:[
				{
					text:'Acciones',
					value:'action',
					align:'center'
				},
				{
					text:'Estado',
					value:'estado',
					align:'center'
				},
				{
					text:'Nro Acta',
					value:'Nro_Acta',
					align:'center'
				},
				{
					text:'Tipo de Acta',
					value:'CodTipo_Infraccion',
					align:'center'
				},
				{
					text:'Fecha de Infracción',
					value:'Fecha_Infraccion',
					align:'center'
				},
				{
					text:'Nombre',
					value:'inf_nom',
					align:'center'
				},
				{
					text:'Número de Juzgado',
					value:'Nro_Juzgado',
					align:'center'
				},
				{
					text:'ID Infractor',
					value:'InfractorID',
					align:'center'
				},
				{
					text:'Localidad',
					value:'Articulos',
					align:'center'
				},
				{
					text:'Observación',
					value:'observacion',
					align:'center'
				},
				{
					text:'Documento Infractor',
					value:'inf_doc',
					align:'center'
				},
				{
					text:'Fallo Desc.',
					value:'fallo_desc',
					align:'center'
				},
				{
					text:'Fecha Fallo',
					value:'fallo_fec',
					align:'center'
				},
				{
					text:'ID Fallo',
					value:'fallo_id',
					align:'center'
				},
				{
					text:'Nro Causa',
					value:'causa',
					align:'center'
				},
				{
					text:'Usuario',
					value:'Log_user',
					align:'center'
				},
				{
					text:'Fecha de Registro',
					value:'Log_date',
					align:'center'
				}
			],
			headersCausas:[
				{
					text:'ID Causa',
					value:'IdCausa',
					aliugn:'center'
				},	
				{
					text:'Número de Causa',
					value:'Nro_Causa',
					aliugn:'center'
				},
				{
					text:'Número de Acta',
					value:'Nro_Acta',
					aliugn:'center'
				},
				{
					text:'Tipo de Acta',
					value:'CodTipo_Infraccion',
					aliugn:'center'
				},
				{
					text:'Fecha de Infracción',
					value:'Fecha_Infraccion',
					aliugn:'center'
				},
				{
					text:'Número de Juzgado',
					value:'Nro_Juzgado',
					aliugn:'center'
				},
				{
					text:'Fallo',
					value:'',
					aliugn:'center'
				},
				{
					text:'Acciones',
					value:'action',
					aliugn:'center'
				},
			],
			headersInfractores:[
				{
					text:'Id',
					value:'Id_Infractor',
					align:'center'
				},
				{
					text:'Tipo de Documento',
					value:'Cod_Tipo_Documento',
					align:'center'
				},
				{
					text:'Número de Documento',
					value:'Nro_Documento',
					align:'center'
				},
				{
					text:'Razón Social',
					value:'Razon_Social',
					align:'center'
				},
				{
					text:'Apellido',
					value:'Apellido',
					align:'center'
				},
				{
					text:'Nombre',
					value:'Nombre',
					align:'center'
				},
				{
					text:'Acciones',
					value:'action',
					align:'center'
				}
			],
			number:[
				v => /[0-9]+$/.test(v)||'Sólo se permiten números.'],
			letras: [
      			y => /[a-zA-Z]+$/.test(y) || 'Sólo se permiten letras.'
    		],
			numLetras:[
				v => /[0-9a-zA-Z]+$/.test(v)||'Sólo se permiten letras y números.'
			],	
			infractores :[],
			rowsCausa : [],			
			causasOriginales: [],
			rowsReincidencias : [],
			generoCausaOK : false,
			emitirPvOK : false,
			puedoGarbarReinc : true,
			rowsDatos:'',
			rowsReincidenciasDatos :'',
			idInfra : '',
			user:'',
			noTeQuiero:true,
			respuestaCompleta : {
				Articulos:'',
				CodTipo_Infraccion:'',
				Fecha_Infraccion:'',
				IDCausa:'',
				Nro_Acta:'',
				Nro_Juzgado:'',
				Localidad:'',							
				estado:'',	
				causa:'',						
				fallo_id:'',
				inf_doc:'',
				inf_id:'',
				inf_nom:'',
				observacion:'',
				fallo_desc:'',
				fallo_fec:'',
				fallo_imp:'',
				Log_user:'',
				InfractorID:'',
				Log_date:''
			},
			causasConFallos:[],
			preEmitirPV:false,
			preGeneroCausa:false,
			causasSinFallos:[],
			vistaExternas:false,
			reincidenciasExternas:{
				menu:false,
				Nro_Acta:'',
				CodTipo_Infraccion:'',
				Fecha_Infraccion:'',
				Localidad:'',
				Articulos:'',
				observacion:''
			},
			articulosSeleccionados:[],
			tieneCausa:false,
			arrExternas:[],
			estadoPermitido:true,
		},

		created(){
			/* this.cargarTipoDocumentos(); */
			/* this.cargarTiposInfraccion(); */
			this.cargarTiposBusqueda();
			this.cargarJuzgados();	
		},

		methods: {
            cargarTipoDocumentos: async function() {

            let aux=[];
            await axios.get('../actas/cargarTipoDocumentos')
            .then(function(response){
                for (let clave in response.data)
                {
                    let obj= Object.values(response.data[clave]);
                    let select= obj[0];
                    aux.push(select);
                }
            });
            return this.tipoDocumentos=aux;				
            },
            cargarTiposBusqueda: async function(){
                this.tiposBusquedaModalReincidencia = [{
                    value:1,
                    text:'Nombre'
                },
                {
                    value:2,
                    text:'Documento'
                },
                {
                    value:3,
                    text:'Razón social'
                },
                {
                    value:4,
                    text:'Dominio'
                },
                {
                    value:5,
                    text:'Domicilio'
                }
            ]
            },
			cerrarModalBusquedaReincidencias: function() {
				$("#modalBuscarReincidencias").modal("hide");
			},

			limpiarBusquedaReincidencia: function(){
				this.infractores = [];
				this.rowsCausa = [];
				this.rowsReincidencias = [];
				this.busquedaReincidencia.nombre = '';
				this.busquedaReincidencia.apellido = '';
				this.busquedaReincidencia.tipoDoc = '';
				this.busquedaReincidencia.nroDoc = '';
				this.busquedaReincidencia.razonSocial= '';
				this.busquedaReincidencia.Dominio = '';
				this.busquedaReincidencia.calle = '';
				this.busquedaReincidencia.CalleAltura = '';
				this.tipoBusquedaModalReincidencia = '';
				this.busquedaManualOK = false;
			},
			cargarTiposInfraccion: async function() {
                var infractor = new Infractor();
                this.tiposActa = await infractor.getTipos().then(function(resultado) {
                    return resultado;
                });
            },
			validarReincidencias:function(){
						if(this.tieneCausa){
							this.emitirPvOK = false;
							this.generoCausaOK = false;
						}else if( !this.tieneCausa && this.arrExternas.length == this.rowsReincidencias.length){
							this.emitirPvOK = true;
							this.generoCausaOK = true;
						}else if(!this.tieneCausa && this.preGeneroCausa){
							this.generoCausaOK = true;
							this.emitirPvOK=false;
						}else if(!this.tieneCausa && this.preEmitirPV){
							this.emitirPvOK = true;
							this.generoCausaOK = true;
						}
			},
			habilitoBusqueda: async function(){
				if(this.Nro_Acta.length != 0 && this.tipoActa.length != 0 ){

					this.limpiarBusquedaReincidencia();

					let data = {
						Nro_Acta:this.Nro_Acta,
						tipoActa:this.tipoActa
					}

					axios.post('actas/buscarExisteActa',data).then((res)=>{
						if(res.data == 0){
							Swal.fire("Datos Invalidos,por favor revise el formulario",'','error');
							return false;
						}
						if(res.data.length == 0){
							this.busquedaManualOK = false;
							Swal.fire("Acta no encontrada!"); 
							return 0;
						}else{
							if(res.data.length > 0){								
								this.validarSiEsCausa(this.Nro_Acta,this.tipoActa)
								axios.post('actas/buscarReincidenciasXActa',data).then((response)=>{
									for(let i = 0; i < response.data.length; i++){
										this.rowsReincidencias.push(response.data[i])
									}
									if(response.data.length != 0){
										this.busquedaManualOK = true;
									}
									else{
										Swal.fire("No hay reincidencias encontradas");
										this.busquedaManualOK = true;	
									}
									if(res.data[0].Estado_numero == "1" || res.data[0].Estado_numero == "2" || res.data[0].Estado_numero == "3"){
										this.busquedaManualOK = true;
										this.estadoPermitido = true;	
									}else{
										this.busquedaManualOK = false;	
										this.estadoPermitido = false;
									}

								}).catch((err)=>{
									swal.fire({
										title:"Error",
										text:"Ocurrió un error inesperado!",
										icon:"warning",
										button:{
											text:"Ok",
											closeModal:false
										}
									})					
								})
							}else{
								Swal.fire("NO HAY ACTAS");
							}						
						}		
					}).catch((err)=>{
						swal.fire({
							title:"Error",
							text:"Ocurrió un error inesperado!",
							icon:"warning",
							button:{
								text:"Ok",
								closeModal:false
							}
						})
					})					
					
				}else{
					Swal.fire("Por favor complete los campos!")
					this.busquedaManualOK = false;					
				}
			},

			buscarInfractor(data){
				return new Promise((resolve,reject)=>{
					let aux=[];
					axios.post('actas/buscarInfractor',data).then((response)=>{
						if(response.data == 0){							
							Swal.fire("Infractor no encontrado!")
							this.estaDisabled = false;
							this.tieneAsociadoBoleano1= true
							this.tieneAsociadoBoleano2= false
							
						}else{
							Swal.fire("Infractor encontrado!")
							this.tieneAsociadoBoleano1= false
							this.tieneAsociadoBoleano2= true
							this.infractores = response.data;
						}
						resolve(response);
					}).catch((err)=>{
						console.log(err);
						reject(err);
					})
				})
				
			},
			evaluarBusqueda(){
				let data={dni:this.busquedaReincidencia.nroDoc,tipoDoc:this.busquedaReincidencia.tipoDoc}
				let dataNombre = {nombre:this.busquedaReincidencia.nombre,apellido:this.busquedaReincidencia.apellido}
				let dataDominio = {dominio:this.busquedaReincidencia.Dominio}
				let dataRazonSoc = {razonSoc:this.busquedaReincidencia.razonSocial}
				let dataDomicilio = {calle : this.busquedaReincidencia.calle,altura : this.busquedaReincidencia.CalleAltura}

				switch(this.tipoBusquedaModalReincidencia){
					case 2:
						if(data.dni.length >= 1 ){
							return this.buscarInfractor(data).then((res)=>{
								return res;
							}).catch((err)=>{
								console.log(err);
							});
						}else{
							Swal.fire("Por favor complete los campos.")
						}
						break;
					case 1:
						if(dataNombre.nombre.length >= 1 || dataNombre.apellido.length >= 1){

							return this.buscarInfractor(dataNombre).then((res)=>{
								return res;
							}).catch((err)=>{
								console.log(err);
							});
						}else{
							Swal.fire("Por favor complete los campos.")
						}
						break;
					case 4:
						if(dataDominio.dominio.length >= 1)
						{
							return this.buscarInfractor(dataDominio).then((res)=>{
								return res;
							}).catch((err)=>{
								console.log(err);
							});
						}else{
							Swal.fire("Por favor complete los campos.")							
						}
						break;
					case 3:
						if(dataRazonSoc.razonSoc.length >= 1)
							{
								return this.buscarInfractor(dataRazonSoc).then((res)=>{
									return res;
								}).catch((err)=>{
									console.log(err);
								});
							}
						else{
							Swal.fire("Por favor complete los campos.")
						}
						break;
					case 5:
						if(dataDomicilio.calle.length >=1 && dataDomicilio.altura.length >= 1)
						{
							let aux=[];
							return this.buscarInfractor(dataRazonSoc).then((res)=>{
									return res;
							}).catch((err)=>{
									console.log(err);
							});
						}else{
							Swal.fire("Por favor complete los campos.")
						}
						break;
					default:
						break;
				}
			},
		cargarTablaXBusqueda: async function(){
				if(this.tipoBusquedaModalReincidencia.length != 0){
					return this.evaluarBusqueda();
				}else{
					Swal.fire("Por favor seleccione el tipo de búsqueda");
				}
				

		},
		cargarArticulosTotales: async function() {
				this.articulosSeleccionado = [];
				let articulos=[];
				let articuloProcesado;
				let articulosCompletos = [];
				let tipoActa = this.reincidenciasExternas.CodTipo_Infraccion;
				let pagoVoluntario= 'false';
				let articulosTotales= await axios.get('actas/jf_traerArticulosxTipo/'+tipoActa+'/'+pagoVoluntario)
				.then(function(response){
					for (let clave in response.data)
					{						
						let valores= response.data[clave]
						articulos.push(valores);
					}
				})

				articulos.forEach(function(articulo, i) {  
					if(articulo.IncisoApartado == " "){
						articulo.IncisoApartado = 'N/A';
					}
					articuloProcesado = ' -Art. nro: ' + articulo.NroArticulo + ' -Inciso apartado: ' + articulo.IncisoApartado +' -Descripción: ' + articulo.Descripcion;
					articulosCompletos.push(articuloProcesado);
				})

				return this.articulosSeleccionados = articulosCompletos;
			},
		buscarCausas : async function(idInfra){
			this.causasConFallos = [];
			this.causasSinFallos = [];
			this.rowsCausa = [];
			this.puedoGrabarReinc = true;

			dataID = {idInfra:idInfra}
			this.idInfra = idInfra;
			await axios.post('actas/buscarCausasInfractor',dataID).then((response)=>{
				if(response.data == 0){
					Swal.fire("No se encontraron actas");
				}else{
					this.rowsCausa = response.data;

					for(let i = 0; i < this.rowsCausa.length; i++){
						if(this.rowsCausa[i].FalloId != 0){
							this.causasConFallos.push(this.rowsCausa[i])
						}else{
							this.causasSinFallos.push(this.rowsCausa[i])
						}

						if( this.rowsCausa[i].FalloTipoCod == 2 || 
							this.rowsCausa[i].FalloTipoCod == 3 || 
							this.rowsCausa[i].FalloTipoCod == 4 || 
							this.rowsCausa[i].FalloTipoCod == 5 || 
							this.rowsCausa[i].FalloTipoCod == 8||
							this.rowsCausa[i].FechaFallo < this.rowsCausa[i].Fecha_Infraccion){
								if(this.rowsCausa[i].FalloId != 0){
									this.rowsCausa[i].reincide = false;
								}else{
									if(this.rowsCausa[i].CodTipo_Infraccion != 'T'){
										this.rowsCausa[i].reincide = false;
									}else{
										this.rowsCausa[i].reincide = true;
									}
								}
							}else{
								if(this.rowsCausa[i].CodTipo_Infraccion != 'T'){
									this.rowsCausa[i].reincide = false;
								}else{
									this.rowsCausa[i].reincide = true;
								}
							}
					}

					if(this.causasConFallos.length == this.rowsCausa.length){
						this.preEmitirPV = true
						this.preGeneroCausa = false
					}else{
						this.preEmitirPV = false;
						this.preGeneroCausa = true;
					}
					this.causasOriginales = this.rowsCausa;
				}
			}).catch((err)=>{
				swal.fire({
							title:"Error",
							text:"Ocurrió un error inesperado!",
							icon:"warning",
							button:{
								text:"Ok",
								closeModal:false
							}
						})
			})
		},
		agregarReincidencia : async function (nroActa,tipoActa){
			this.puedoGarbarReinc = true;
			this.user ='L'+document.getElementById("user").innerText
			if(nroActa != undefined && nroActa != 0 && tipoActa != '' && tipoActa != undefined)
			{
				let data = {
					idInfra : this.idInfra,
					Nro_Acta : nroActa,
					tipoActa : tipoActa
				}
				await axios.post('../actas/agregarReincidencia',data).then((response)=>{

					let respuestaFinal = {
						Articulos : response.data.Articulos,
						CodTipo_Infraccion : response.data.CodTipo_Infraccion,
						Fecha_Infraccion : response.data.Fecha_Infraccion,
						IDCausa : response.data.IDCausa,
						Nro_Acta : response.data.Nro_Acta,
						Nro_Juzgado : response.data.Nro_Juzgado,
						InfractorID : response.data.inf_id,
						Localidad : response.data.Localidad,
						estado : response.data.estado,
						causa : response.data.causa,
						fallo_id : response.data.fallo_id,
						inf_doc : response.data.inf_doc,
						inf_id : response.data.inf_id,
						inf_nom : response.data.inf_nom,
						observacion : '',
						fallo_desc : '',
						fallo_fec : '',
						fallo_imp : 0,
						Log_user : this.user,
						Log_date : 0
					}
					this.rowsReincidencias.push(respuestaFinal);
					
				}).catch((err)=>{
					swal.fire({
                                title:"Error",
                                text:"Ocurrió un error inesperado!",
                                icon:"warning",
                                button:{
                                    text:"Ok",
                                    closeModal:false
                                }
                            })
				})
			}
		},
		seleccionarTodo(){
			for(causa of this.rowsCausa){
				if(causa.reincide){
					this.agregarReincidencia(causa.Nro_Acta,causa.CodTipo_Infraccion);
				}
			}
		},
		grabarReincidencias: async function(){
			if(this.rowsReincidencias.length > 0){
				if(this.tieneCausa){
					this.emitirPvOK = false;
					this.generoCausaOK = false;
				}else{
					await this.validarReincidencias()
				}

				let data = {reincidencias:this.rowsReincidencias,Nro_Acta:this.Nro_Acta,tipoActa:this.tipoActa}
				await axios.post('../actas/grabarReincidencias',data).then((response)=>{
					swal.fire({
                                title:"Error",
                                text:"Ocurrió un error inesperado!",
                                icon:"warning",
                                button:{
                                    text:"Ok",
                                    closeModal:false
                                }
                            })
						if(response.data == 1){
							Swal.fire("Reincidencias almacenadas exitosamente!")
						}else{
							Swal.fire("Ocurrió un error, intente nuevamente!")
						}
				}).catch((err)=>{
					swal.fire({
                                title:"Error",
                                text:"Ocurrió un error inesperado!",
                                icon:"warning",
                                button:{
                                    text:"Ok",
                                    closeModal:false
                                }
                            })
				})
			}else{
				let data = {
					nroActa:this.Nro_Acta,
					tipoActa:this.tipoActa
				}
				axios.post('../actas/grabarSinReincidencias',data).then((res)=>{
					if(res.data.cod_estado == 1){
						Swal.fire(res.data.mensaje)
					}else{
						Swal.fire({
							title:"Error",
                            text:res.data.mensaje,
                            icon:"warning",
                            button:{
                                text:"Ok",
                                closeModal:false
                            }
							})
					}
				}).catch((err)=>{
					Swal.fire({
                        title:"Error",
                        text:"Ocurrió un error inesperado!",
                        icon:"warning",
                        button:{
                            text:"Ok",
                            closeModal:false
                            }
                    })
				})

				if(this.tieneCausa){
					this.emitirPvOK = false;
					this.generoCausaOK = false;
				}else{
					await this.validarReincidencias()
				}				
			}
		},
		eliminarReincidencia : function (reincidencia){
			let index = this.rowsReincidencias.indexOf(reincidencia)
			this.rowsReincidencias.splice(index,1)

			let indexExt = this.arrExternas.indexOf(reincidencia)
			if(indexExt != undefined && indexExt != -1){
				if(this.arrExternas[indexExt] == reincidencia){
					this.arrExternas.splice(indexExt,1);
				}
			}			
		},
		eliminarInfra(infra){
			let index = this.rows.indexOf(infra)
			this.rows.splice(index,1)
		},
		modificarReincidente(idReincide){
		},
		eliminarInfra(infra){
			let index = this.rows.indexOf(infra)
			this.rows.splice(index,1)
		},
		modificarReincidente(idReincide){
		},
		llamarGenerarCausa : async function (){
            var acta = {};
            var NroJuzgado=null;
            await axios.get('../jf_traer_actasxnroacta/'+this.Nro_Acta+'/'+this.tipoActa).then((res)=>{
                if(res.data.length > 0){
                    acta = res.data[0];
                }
            }).catch((err)=>{
                console.log(err);
            })

            await axios.get('asignarJuzgado/'+this.tipoActa+'/'+NroJuzgado+'/'+acta.Transito_Urgente).then((response)=>{
				NroJuzgado = parseInt(response.data[0].Nro_Juzgado);
			}).catch((err)=>{
				Swal.fire("Ocurrió un error, por favor intente nuevamente o comuníquese con los administradores")
			})
            let data={
                Nro_acta:this.Nro_Acta,
                tipoActa:this.tipoActa,
                fechacarga:acta.Fecha_Recepcion_Acta,
                urgente:acta.Transito_Urgente,
                NroJuzgado:NroJuzgado
            }

            await axios.post('GenerarNroCausa',data).then((res)=>{
                if(res.data != 0){
                    var datos = new Object();
                    datos.Nro_acta = this.Nro_Acta;
                    datos.tipoActa = this.tipoActa;
                    datos.Estado_Numero = 7;
                    axios.post('../actas/JF_Grabar_Estado_Acta', datos ).then(function(response) {
                        if (response.data == 1) {
                            swal.fire({
                                    title:"El acta cambió de estado",
                                    text:"",
                                    icon:"success",
                                    timerProgressBar: true,
                                    timer: 2000,
                                }).then(()=>{
                                    window.location.reload();
                                })
                           
                        } else {
                            extensionActa.mandarAlert('error', 'Ocurrio un problema cambiando de estado la causa', false, 'center', 0, true);
                        }
                    }).catch(function(error) {
                        swal.fire({
                                    title:"Error",
                                    text:"Ocurrió un error inesperado!",
                                    icon:"warning",
                                    button:{
                                        text:"Ok",
                                        closeModal:false
                                    }
                                })
                    });
                }
            }).catch((err)=>{
                console.log(err);
            })
		},
		cambiarConvertir: function(valor)
		{
			this.rowsDatos = JSON.stringify(this.rows);	  
			this.rowsReincidenciasDatos = JSON.stringify(this.rowsReincidencias);	  
			this.dominioActa = extensionActa.dominio;
			this.fechaInfraccionActa = extensionActa.dateInfraccion;
			this.articulos = JSON.stringify(extensionActa.articulosImprimir);
  		},
		emitirPV:function(){
			var datos = new Object();
				datos.Nro_acta = this.Nro_Acta;
				datos.tipoActa = this.tipoActa;
				datos.Estado_Numero = 4;
				axios.post('../actas/JF_Grabar_Estado_Acta', datos ).then(function(response) {
					if (response.data == 1) {
						Swal.fire('La causa cambió de estado ');
						window.location.href='https://prepro.moron.gob.ar/JusticiaFaltasWeb_V1.1/pagosvoluntarios/emitir'
					} else {
						extensionActa.mandarAlert('error', 'Ocurrio un problema cambiando de estado la causa', false, 'center', 0, true);
					}
				}).catch(function(error) {
					swal.fire({
                                title:"Error",
                                text:"Ocurrió un error inesperado!",
                                icon:"warning",
                                button:{
                                    text:"Ok",
                                    closeModal:false
                                }
                            })
				});
		},
		vistaReincidenciasExternas(){
			if(this.vistaExternas){
				this.vistaExternas = false;
			}else{
				this.vistaExternas = true;
			}
		},
		async agregarReincidenciaExterna(){
			if(this.reincidenciasExternas.Nro_Acta == '' || this.reincidenciasExternas.Nro_Acta == '' || this.reincidenciasExternas.Nro_Acta == null || this.reincidenciasExternas.Nro_Acta == undefined){
				Swal.fire("El Nro de Acta es requerido!",'','error');
				return false;
			}
			if(this.reincidenciasExternas.CodTipo_Infraccion == '' || this.reincidenciasExternas.CodTipo_Infraccion == null || this.reincidenciasExternas.CodTipo_Infraccion == undefined){
				Swal.fire("El tipo de acta es requerido !",'','error');
				return false;
			}
			if(this.reincidenciasExternas.Localidad == '' || this.reincidenciasExternas.Localidad == null || this.reincidenciasExternas.Localidad == undefined){
				Swal.fire("La localidad es requerida!",'','error');
				return false;
			}
				
			this.rowsReincidencias.push(this.reincidenciasExternas);
			this.arrExternas.push(this.reincidenciasExternas);
		},
		validarSiEsCausa(nroActa,tipoActa){
			axios.get('../actas/validarEsCausa/'+nroActa+'/'+tipoActa).then((response)=>{
				if(response.data[0]!=undefined){
					this.tieneCausa = true;
				}else{
					this.tieneCausa = false;
				}
			}).catch((err)=>{
				swal.fire({
					title:"Error",
					text:"Ocurrió un error inesperado!",
					icon:"warning",
					button:{
						text:"Ok",
						closeModal:false
					}
				})
			})
		},
		cargarJuzgados: async function(){
			await axios.get('../actas/cargarJuzgados1').then((response)=>{
				this.juzgados = response.data;
			}).catch((err)=>{
				Swal.fire({
                                title:"Error",
                                text:"Ocurrió un error inesperado!",
                                icon:"warning",
                                button:{
                                    text:"Ok",
                                    closeModal:false
                                }
                            })   
			})
		},
	}
	})
</script>
@endsection