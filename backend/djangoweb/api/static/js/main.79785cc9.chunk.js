(this.webpackJsonpreact_dev=this.webpackJsonpreact_dev||[]).push([[0],{53:function(e,t,a){e.exports=a(81)},81:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(28),r=a.n(c),o=a(22),i=a(17),l=a(52),u=a(23);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var d=!0,m=a(5),p=a(6),f=a(8),h=a(7),b=a(12),g=s.a.createContext(),y=(s.a.Component,function(){return s.a.createElement("nav",null,s.a.createElement("ul",{className:"inline"},s.a.createElement("li",{className:"list-inline-item"},s.a.createElement("h1",null,"CELL ANALYSIS"))))}),v=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"py-5 text-center"},s.a.createElement("img",{src:"/static/img/logo192.png",width:"200",alt:"img"}),s.a.createElement("br",null),s.a.createElement("a",{href:"/api/logout",className:"btn btn-warning"},"Logout"))}}]),a}(s.a.Component),O=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{className:"container"},s.a.createElement(v,null),this.props.children)}}]),a}(s.a.Component),j=a(21),E=a(19),_=a(34),w=a(39),k=a(31),N=a(15),x=a.n(N),A=a(9),C=a(13),S=a.n(C);console.log("ENV:","");var T=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).list=[],n.mode="create",n._uploadProgress=0,n._forceUpdate=function(){return null},n._form={},n._subscribers=[],n._selectList={genre:[],admin:[]},n.forceUpdateOnSubscribers=function(e){n._subscribers.includes(e)&&n.forceUpdate()},n.getSelectList=function(e){return n._selectList[e]?n._selectList[e]:[]},n.onSelect=function(e,t){console.log("Select ",e,t),n.form[t]=e.value},n.selected=function(e){if(console.log("Select selected",e),!e)return{value:"na",label:"NA"};var t=n._selectList[e].find((function(t){return t.value==n.form[e]}));return t||n._selectList[e][0]},n.debug=!0,n.setUploadProgress=n.setUploadProgress.bind(Object(k.a)(n)),n}return Object(p.a)(a,[{key:"subscribe",value:function(e){return Array.isArray(e)?this._subscribers=[].concat(Object(w.a)(this._subscribers),Object(w.a)(e)):this._subscribers.push(e),this}},{key:"setUploadProgress",value:function(e){this._uploadProgress=e,e>95&&this.resetForm(),this._forceUpdate()}},{key:"resetForm",value:function(){var e=this;Object.keys(this.form).forEach((function(t){e._form[t]=""})),this._uploadProgress=0,this._forceUpdate()}},{key:"submitForm",value:function(e,t){var a=this,n=new FormData;Object.keys(this.form).map((function(e){n.append(e,a.form[e])})),this.hasId?t({formData:n,action:this.setUploadProgress}):e({formData:n,action:this.setUploadProgress})}},{key:"__class",get:function(){return"ActiveRecord"}},{key:"forceUpdate",set:function(e){this._forceUpdate=e}},{key:"form",set:function(e){for(var t in this._form={},e)this._form[t]=e[t];return this},get:function(){return this._form}},{key:"uploadProgress",get:function(){return this._uploadProgress}},{key:"hasId",get:function(){return!!(this.form.id&&this.form.id.length>0)||!!(this.form._id&&this.form._id.length>0)}}]),a}(function(){function e(t){Object(m.a)(this,e),this.forceUpdate=function(){return null},this.name=t,this.forceUpdate=function(){return null},this.server="/api/v1/"+t,this.debug=!1}return Object(p.a)(e,[{key:"log",value:function(e){0}},{key:"types",get:function(){return{create:this.name+".create",create_success:this.name+".create.success",create_fail:this.name+".create.fail",read:this.name+".read",read_success:this.name+".read.success",read_fail:this.name+".read.fail",edit:this.name+".edit",edit_success:this.name+".edit.success",edit_fail:this.name+".edit.fail",update:this.name+".update",update_success:this.name+".update.success",update_fail:this.name+".update.fail",delete:this.name+".delete",delete_success:this.name+".delete.success",delete_fail:this.name+".delete.fail"}}},{key:"actions",get:function(){var e=this;return console.log("Inside actions"),{create:function(t){return{type:e.types.create,payload:{data:t}}},create_success:function(t){return{type:e.types.create_success,payload:{data:t}}},create_fail:function(t){return{type:e.types.create_fail,payload:{data:t}}},read:function(t){return{type:e.types.read,payload:{data:t}}},read_success:function(t){return{type:e.types.read_success,payload:{data:t}}},read_fail:function(t){return{type:e.types.read_fail,payload:{data:t}}},update:function(t){return{type:e.types.update,payload:{data:t}}},update_success:function(t){return{type:e.types.update_success,payload:{data:t}}},update_fail:function(t){return{type:e.types.update_fail,payload:{data:t}}},edit:function(t){return{type:e.types.edit,payload:{data:t}}},edit_success:function(t){return{type:e.types.edit_success,payload:{data:t}}},edit_fail:function(t){return{type:e.types.edit_fail,payload:{data:t}}},delete:function(t){return{type:e.types.delete,payload:{data:t}}},delete_success:function(t){return{type:e.types.delete_success,payload:{data:t}}},delete_fail:function(t){return{type:e.types.delete_fail,payload:{data:t}}}}}},{key:"reducers",get:function(){var e=this,t={list:[],form:{},actions:{type:null,ok:!1}};return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(n.type){case e.types.read_success:var s=n.payload.data,c=s.list,r=s.form,o=s.actions,i=Object(b.a)({},a);return c&&(i.list=c),r&&(i.form=r),o&&(i.actions=o),i;case e.types.edit:e.log("Inside reducer of class "+e.name+" : "+JSON.stringify(n.payload));var l=n.payload.data;return l.mode=e.types.edit,i=Object(b.a)({},a,{},{form:l});case e.types.create_success:var u=n.payload.data;r=u.form,o=u.actions;return console.log("inside create_success",o),1===o.ok&&r._id&&(r={}),o.timestamp=Date.now(),Object(b.a)({},a,{},{actions:o,form:r});case e.types.update_success||e.types.delete_success:var d=n.payload.data;c=d.list,r=d.form,o=d.actions,i=Object(b.a)({},a);return c&&(i.list=c),r&&(i.form=r),o&&(i.actions=o),i;default:return e.log("Inside show default reducer of class "+e.name+JSON.stringify(n)),a}}}},{key:"sagas",get:function(){var e=this;return{create:x.a.mark((function t(a){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Action in saga",a.payload),t.prev=1,t.next=4,Object(A.a)(e.api.create,{formData:a.payload.data.formData,action:function(e){return a.payload.data.action?a.payload.data.action(e):null}});case 4:return n=t.sent,console.log("CREATE ",n),console.log("CREATE if",n),t.next=10,Object(A.b)(e.actions.create_success(n));case 10:t.next=15;break;case 12:return console.log("CREATE fail",n),t.next=15,Object(A.b)(e.actions.create_fail(n));case 15:t.next=23;break;case 17:return t.prev=17,t.t0=t.catch(1),console.log(t.t0),console.log("CREATE err",t.t0),t.next=23,Object(A.b)(e.actions.create_fail(t.t0));case 23:case"end":return t.stop()}}),t,null,[[1,17]])})),read:x.a.mark((function t(a){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(A.a)(e.api.read,a.payload);case 3:return n=t.sent,t.next=7,Object(A.b)(e.actions.read_success(n));case 7:t.next=11;break;case 9:return t.next=11,Object(A.b)(e.actions.read_fail(n));case 11:t.next=17;break;case 13:return t.prev=13,t.t0=t.catch(0),t.next=17,Object(A.b)(e.actions.read_fail(t.t0));case 17:case"end":return t.stop()}}),t,null,[[0,13]])})),update:x.a.mark((function t(a){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(A.a)(e.api.update,{formData:a.payload.data.formData,action:function(e){return a.payload.data.action?a.payload.data.action(e):null}});case 3:if(!(n=t.sent)||!Array.isArray(Object.keys(n))){t.next=11;break}return t.next=7,Object(A.b)(e.actions.update_success(n));case 7:return t.next=9,Object(A.b)(e.actions.read());case 9:t.next=13;break;case 11:return t.next=13,Object(A.b)(e.actions.update_fail(n));case 13:t.next=20;break;case 15:return t.prev=15,t.t0=t.catch(0),console.log(t.t0),t.next=20,Object(A.b)(e.actions.update_fail(t.t0));case 20:case"end":return t.stop()}}),t,null,[[0,15]])})),deleted:x.a.mark((function t(a){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,"reset"!==a.payload.data){t.next=6;break}return t.next=4,Object(A.b)(e.actions.delete_success(a.payload.data));case 4:t.next=18;break;case 6:return t.next=8,Object(A.a)(e.api.delete,a.payload);case 8:if(n=t.sent,!Array.isArray(Object.keys(n))){t.next=16;break}return t.next=12,Object(A.b)(e.actions.delete_success(n));case 12:return t.next=14,Object(A.b)(e.actions.read());case 14:t.next=18;break;case 16:return t.next=18,Object(A.b)(e.actions.delete_fail(n));case 18:t.next=24;break;case 20:return t.prev=20,t.t0=t.catch(0),t.next=24,Object(A.b)(e.actions.delete_fail(t.t0));case 24:case"end":return t.stop()}}),t,null,[[0,20]])}))}}},{key:"api",get:function(){var e=this;return{read:function(){return S.a.get(e.server).then((function(e){return e.data})).catch((function(e){throw new Error(e)}))},create:function(t){var a={onUploadProgress:function(e){var a=Math.round(100*e.loaded/e.total);t.action&&t.action(a)}};return console.log("API",t),S.a.post(e.server,t.formData,a).then((function(e){return e.data})).catch((function(e){throw new Error(e)}))},delete:function(t){return S.a.delete(e.server+"/"+t.data).then((function(e){return e.data})).catch((function(e){throw new Error(e)}))},update:function(t){var a=t.formData,n={onUploadProgress:function(e){var a=Math.round(100*e.loaded/e.total);t&&t.action(a)}};return S.a.put(e.server+"/"+a.getAll("_id"),a,n).then((function(e){return console.log("Update response: ",e),e.data})).catch((function(e){throw new Error(e)}))}}}}]),e}()),P=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).newApiRead=function(e){var t=e.data;if(console.log("Inside api newApiRead",t),!t.channel1)return console.log("Inside api newApiRead undef",t.channel1),{};var a="?";return Object.keys(t).forEach((function(e){return a+="".concat(e,"=").concat(t[e],"&")})),a+="&params="+a,S.a.get(n.server+a).then((function(e){return e.data})).catch((function(e){throw new Error(e)}))},n.form={plots:{}},console.log("Plots",n.types),n}return Object(p.a)(a,[{key:"api",get:function(){var e=Object(_.a)(Object(E.a)(a.prototype),"api",this);return e.read=this.newApiRead,e}}]),a}(T),R=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).form={channels:[],channel1:"",channel2:"",transformation:"hlog",transformations:["hlog","tlog","glog"],bins:100},console.log("Plots",n.types),n}return a}(T),U=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).newApiRead=function(e){var t=e.data;if(console.log("Inside api newApiRead",t),!t.channel1)return console.log("Inside api newApiRead undef",t.channel1),{};var a="?";return Object.keys(t).forEach((function(e){return a+="".concat(e,"=").concat(t[e],"&")})),a+="&params="+a,S.a.get(n.server+a).then((function(e){return e.data})).catch((function(e){throw new Error(e)}))},n.form={plots:{}},console.log("Plots",n.types),n}return Object(p.a)(a,[{key:"api",get:function(){var e=Object(_.a)(Object(E.a)(a.prototype),"api",this);return e.read=this.newApiRead,e}}]),a}(T),D=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).form={plots:{}},console.log("Plots",n.types),n}return a}(T),G={basics:new R("basics"),plots:new P("plots"),mls:new U("mls"),cls:new D("cls")},F={histogram1d:{heading:"Histogram 1 D",p:"\n                This is the histogram in one dimension for the FCS file\n            "},histogram2d:{heading:"Histogram 2 D",p:"This is the histogram in two dimensions for the FCS file. It is plotting using the provided two channels from the\n                select lists.\n            "},compensation:{heading:"Compensation",p:"This is obtained by interchanging channels data and multiplied\n                (by 0.15 for channel 1, by 0.32 form channel 2) and subtracted from respective channels.\n            "},custom_transformation:{heading:"Custom Transformation",p:"\n                This is custom transformation plot. The custom transformation is obtained by taking the log of each channel.\n            "},scatter:{heading:"Scatter plot",p:"\n                This is scatter plot for the two channels selected.\n            "},threshold_gate:{heading:"Threshold Gate",p:"\n                This is threshold gate plot. This is obtained by applying x and y gating on axes.\n            "}},I={histogram:{heading:"Histogram",p:"\n                The histogram of the two tubes which were treated with two different concentrations of Doxycycline.\n            "},gausian:{heading:"Gausian plot",p:"\n                The Gausian Machine learning model is used to separate the data into two/more populations. It uses a default\n                estimation method for parameters.\n            "},gausian_table:{heading:"Gausian Table",p:"\n                We applied GaussianMixtureModelOp method to add new piece of meta data to each event in the data set. The\n                events are labelled as Gauss_1 and Gauss_2 in the table.\n            "},gausian_posterior:{heading:"Gausian Posterior",p:"\n                Sometimes the mixtures are close enough to be separated and therefore we filtered the events by applying posterior probability.\n            "},gausian_posterior_table:{heading:"Gausian Posterior Table",p:"\n                The table shows the posterior probability of each event, marked as Gauss_1_ posterior and Gauss_2_posterior.\n            "},gausian_filtered_low_posterior:{heading:"Gausian filtered low posterior",p:"\n                The is the plot after filtering out the low posterior probability of each event.\n            "},gausian_mixture_model_two_channels:{heading:"Gausian mixture model two channels",p:"\n                The GaussianMixtureOp can work with multidimensions of channels. This is a plot of two channels workflow.\n            "},k_means:{heading:"K Means",p:"\n                The plot shows the K Means in the Gaussian mixture model. The centroids are marked with a star symbol.\n            "},k_means2:{heading:"K Means 3 clusters",p:"\n                The plot shows the K Means in the Gaussian mixture model. The centroids are marked with a star symbol.\n                The shows a more clear clustering by taking the log of the channels instead.\n            "}},L=function(e){var t=e.image,a=e.data_section,n="data_ml"===a?I:F,c=n[t.id]?n[t.id]:{heading:"Heading",p:"Para"},r=c.heading,o=c.p,i=t.id[0].toUpperCase()+t.id.slice(1).split("_").join(" ");return s.a.createElement("div",{className:"data_ml"===a?"col-sm-12 py-2":"col-sm-6 py-2"},s.a.createElement("div",{className:"card"},s.a.createElement("div",{className:"card-header"},i),s.a.createElement("div",{className:"card-body"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-sm-8"},s.a.createElement("img",{className:"img-fluid",src:t.src,alt:t.id})),s.a.createElement("div",{className:"col-sm-4"},s.a.createElement("h5",{className:"card-title"},r),s.a.createElement("p",{className:"card-text"},o))))))},M=function(){return s.a.createElement("img",{src:"/static/img/loading.gif",width:"150",alt:"Loading..."})},W=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={loading:!1,channel1:0,channel2:0,transformation:"hlog",bins:0,plot:G.plots},n}return Object(p.a)(a,[{key:"componentWillReceiveProps",value:function(e,t){console.log("componentWillReceiveProps");var a=this.props.readAction,n=this.state,s=n.channel1,c=n.channel2,r=n.transformation,o=n.bins,i=n.plot;if(console.log(s,c,r,o),s===e.basics.form.channel1&&c===e.basics.form.channel2&&r===e.basics.form.transformation&&o===e.basics.form.bins)console.log("Same"),i.list=e.plots.list,this.setState({plot:i,loading:!1});else{console.log("Diff");var l={channel1:e.basics.form.channel1,channel2:e.basics.form.channel2,transformation:e.basics.form.transformation,bins:e.basics.form.bins};a(l),this.setState(Object(b.a)({},l,{loading:!0}))}}},{key:"render",value:function(){var e=this.state,t=e.plot,a=e.loading;return Object.keys(t.list).length<1||a?s.a.createElement(M,null):(console.log("Plots",t.list),s.a.createElement("div",{className:"row py-3"},s.a.createElement("div",{className:"col-sm-12"},s.a.createElement("h1",null,"Plots")),Object.keys(t.list).map((function(e){return s.a.createElement(L,{key:e,image:{id:e,src:"/static/plots/plotting/"+t.list[e]},data_section:"data_plots"})}))))}}]),a}(s.a.Component),J={readAction:G.plots.actions.read,deleteAction:G.plots.actions.delete,createAction:G.plots.actions.create,createSuccessAction:G.plots.actions.create_success,updateAction:G.plots.actions.update},B=Object(j.d)(Object(i.b)((function(e){return{plots:e.plots,basics:e.basics}}),J)(W)),H=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={loading:!1,channel1:0,channel2:0,transformation:"hlog",bins:0,ml:G.mls},n}return Object(p.a)(a,[{key:"componentWillReceiveProps",value:function(e,t){console.log("componentWillReceiveProps");var a=this.props.readAction,n=this.state,s=n.channel1,c=n.channel2,r=n.transformation,o=n.bins,i=n.ml;if(console.log(s,c,r,o),s===e.basics.form.channel1&&c===e.basics.form.channel2&&r===e.basics.form.transformation&&o===e.basics.form.bins)console.log("Same"),i.list=e.mls.list,this.setState({ml:i,loading:!1});else{console.log("Diff");var l={channel1:e.basics.form.channel1,channel2:e.basics.form.channel2,transformation:e.basics.form.transformation,bins:e.basics.form.bins};a(l),this.setState(Object(b.a)({},l,{loading:!0}))}}},{key:"render",value:function(){var e=this.state,t=e.ml,a=e.loading;return Object.keys(t.list).length<1||a?s.a.createElement(M,null):(console.log("Plots",t.list),s.a.createElement("div",{className:"row py-3"},s.a.createElement("div",{className:"col-sm-12"},s.a.createElement("h1",null,"ML")),Object.keys(t.list).map((function(e){return s.a.createElement(L,{key:e,image:{id:e,src:"/static/plots/machinelearning/"+t.list[e]},data_section:"data_ml"})}))))}}]),a}(s.a.Component),K={readAction:G.mls.actions.read,deleteAction:G.mls.actions.delete,createAction:G.mls.actions.create,createSuccessAction:G.mls.actions.create_success,updateAction:G.mls.actions.update},V=Object(j.d)(Object(i.b)((function(e){return{mls:e.mls,basics:e.basics}}),K)(H)),Y=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={loading:!1,channel1:0,channel2:0,transformation:"hlog",bins:0,cl:G.cls},n}return Object(p.a)(a,[{key:"componentWillReceiveProps",value:function(e,t){e.readAction;var a=e.cls;console.log("Cls componentWillReceiveProps",a);var n=this.state.cl;n.list=a.list,this.setState({cl:n,loading:!1})}},{key:"render",value:function(){var e=this.state,t=e.cl,a=e.loading;return Object.keys(t.list).length<1||a?s.a.createElement(M,null):(console.log("Classification",t.list),s.a.createElement("div",{className:"row py-3"},s.a.createElement("div",{className:"col-sm-12"},s.a.createElement("h1",null,"Classification")),s.a.createElement("div",{className:"col-sm-12"},Object.keys(t.list).map((function(e){return s.a.createElement("div",{className:"jumbotron",key:e},s.a.createElement("h2",{className:"display-6"},e),s.a.createElement("h3",{className:"display-8 mt-4"},"Test Score"),Object.keys(t.list[e].test_score).map((function(a){return s.a.createElement("strong",null,a," : ",JSON.stringify(t.list[e].test_score[a]),s.a.createElement("br",null))})),s.a.createElement("h3",{className:"display-8 mt-4"},"Number of Malignant and Benign cells"),s.a.createElement("table",{className:"table"},s.a.createElement("thead",null,s.a.createElement("tr",null,Object.keys(t.list[e].predictions.counts).map((function(e){return s.a.createElement("th",null,e)})))),s.a.createElement("tbody",null,s.a.createElement("tr",null,Object.keys(t.list[e].predictions.counts).map((function(a){return s.a.createElement("td",null,s.a.createElement("strong",null,"Benign : "),JSON.stringify(t.list[e].predictions.counts[a][0]),s.a.createElement("br",null),s.a.createElement("strong",null,"Malignant : "),JSON.stringify(t.list[e].predictions.counts[a][1]))}))))),s.a.createElement("hr",{className:"my-4"}))})))))}}]),a}(s.a.Component),$={readAction:G.cls.actions.read,deleteAction:G.cls.actions.delete,createAction:G.cls.actions.create,createSuccessAction:G.cls.actions.create_success,updateAction:G.cls.actions.update},q=Object(j.d)(Object(i.b)((function(e){return{cls:e.cls,basics:e.basics}}),$)(Y)),z=(a(33),s.a.createContext(),{read:function(){return S.a.get("/api/basic").then((function(e){return e.data})).catch((function(e){return console.error(e)}))}}),Q=function(){var e=s.a.createRef();return s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-12 order-md-0"},s.a.createElement("h2",{className:"mb-3"},"Upload FCS File"),s.a.createElement("form",{method:"post",encType:"multipart/form-data",action:"/api/upload"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-12 mb-3"},s.a.createElement("div",{className:"input-group"},s.a.createElement("div",{className:"custom-file"},s.a.createElement("input",{ref:e,type:"file",className:"custom-file-input",id:"fcs_file",name:"fcs_file",multiple:!0,"aria-describedby":"fcs_file"}),s.a.createElement("label",{className:"custom-file-label",htmlFor:"fcs_file"},"Choose file")),s.a.createElement("div",{className:"input-group-append"},s.a.createElement("input",{className:"btn btn-outline-secondary",type:"button",id:"upload",value:"Upload",onClick:function(t){t.preventDefault(),function(){var t=new FormData,a=e.current.files;t.append("fcs_file",a[0]),S.a.post("/api/upload",t,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log("File uploaded"),z.read().then((function(e){e&&window.location.reload(!1)}))})).catch((function(e){return console.log("Error occurred ",e)}))}()}}))))),s.a.createElement("hr",{className:"mb-4"}))))},X=a(20),Z=function(e){var t=e.channels;return t=t&&t.channels?t.channels:t,console.log("Basic_ componentOptions: ",e),t&&Array.isArray(t)?t.map((function(e){return s.a.createElement("option",{key:e,value:e},e)})):s.a.createElement("option",{value:"1"},"Loading...")},ee=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).onChange=function(e){var t=n.state.attributes;t[e.target.id]=e.target.value,n.setState({attributes:t})},n.onClick=function(e){e.preventDefault();var t=n.state.attributes;(0,n.props.createSuccessAction)({actions:{status:"success",ok:1},form:t}),console.log("Firing actions")},n.state={basic:G.basics,attributes:{channels:[],channel1:"",channel2:"",transformation:"hlog",bins:100}},n}return Object(p.a)(a,[{key:"componentWillReceiveProps",value:function(e,t){var a=this.state,n=a.basic,s=a.attributes;n.list=e.basics.list,s.channel1&&s.channel2||(s.channel1=n.list[0],s.channel2=n.list[1]),this.setState({basic:n})}},{key:"render",value:function(){var e,t,a,n=this,c=this.state,r=c.basic,o=c.attributes;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"row",id:"basic-div"},s.a.createElement("div",{className:"col-md-12 order-md-0"},s.a.createElement("h1",null,"Basic info"),s.a.createElement("p",{className:"lead",id:"basic-info"}),s.a.createElement("select",(e={className:"form-control",id:"channel-name-1",value:o.channel1},Object(X.a)(e,"id","channel1"),Object(X.a)(e,"onChange",(function(e){return n.onChange(e)})),e),s.a.createElement(Z,{channels:r.list})),s.a.createElement("br",null),s.a.createElement("select",(t={className:"form-control",id:"channel-name-2",value:o.channel2},Object(X.a)(t,"id","channel2"),Object(X.a)(t,"onChange",(function(e){return n.onChange(e)})),t),s.a.createElement(Z,{channels:r.list.slice(1)})),s.a.createElement("br",null),s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-6"},s.a.createElement("select",(a={className:"form-control",id:"transformations",value:o.transformation},Object(X.a)(a,"id","transformation"),Object(X.a)(a,"onChange",(function(e){return n.onChange(e)})),a),s.a.createElement(Z,{channels:r.form.transformations}))),s.a.createElement("div",{className:"col-md-6"},s.a.createElement("input",{type:"number",defaultValue:o.bins,className:"form-control",id:"bins",onChange:function(e){return n.onChange(e)}}))),s.a.createElement("br",null),s.a.createElement("button",{onClick:function(e){return n.onClick(e)},className:"btn btn-lg btn-success"},s.a.createElement("i",{className:"fas fa-chart-line"})," Display"),s.a.createElement("hr",{className:"mb-4"}))))}}]),a}(s.a.Component),te={readAction:G.basics.actions.read,deleteAction:G.basics.actions.delete,createAction:G.basics.actions.create,createSuccessAction:G.basics.actions.create_success,updateAction:G.basics.actions.update},ae=Object(j.d)(Object(i.b)((function(e){return{basics:e.basics}}),te)(ee)),ne=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){return Object(m.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(y,null),s.a.createElement(O,null,s.a.createElement(Q,null),s.a.createElement(ae,null),s.a.createElement(B,null),s.a.createElement(V,null),s.a.createElement(q,null)))}}]),a}(n.Component),se=x.a.mark(ce);function ce(){var e,t;return x.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:e=0;case 1:if(!(e<Object.keys(G).length)){a.next=14;break}return t=G[Object.keys(G)[e]],a.next=5,Object(A.c)(t.types.create,t.sagas.create);case 5:return a.next=7,Object(A.c)(t.types.read,t.sagas.read);case 7:return a.next=9,Object(A.c)(t.types.update,t.sagas.update);case 9:return a.next=11,Object(A.c)(t.types.delete,t.sagas.deleted);case 11:e++,a.next=1;break;case 14:case"end":return a.stop()}}),se)}for(var re={},oe=0;oe<Object.keys(G).length;oe++){var ie=G[Object.keys(G)[oe]];re[ie.name]=ie.reducers}var le=Object(o.c)(Object.assign({},{},re)),ue=Object(l.a)(),de=window.navigator.userAgent.includes("Chrome")&&window.devToolsExtension&&d?Object(o.d)(Object(o.a)(ue),window.devToolsExtension&&window.devToolsExtension()):Object(o.a)(ue),me=Object(o.e)(le,{},de);ue.run(ce),console.log(me.getState());for(var pe=0;pe<Object.keys(G).length;pe++){var fe=G[Object.keys(G)[pe]];me.dispatch(fe.actions.read({}))}d&&me.subscribe((function(){console.log("subscribed store in index",me.getState())})),r.a.render(s.a.createElement(u.a,null,s.a.createElement(i.a,{store:me},s.a.createElement(ne,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[53,1,2]]]);
//# sourceMappingURL=main.79785cc9.chunk.js.map