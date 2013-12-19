
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var removeSkillB = {};	// @button
	var txtNewPrjEnd = {};	// @textField
	var txtNewPrjStart = {};	// @textField
	var txtProjectBudget = {};	// @textField
	var txtNewProjectName = {};	// @textField
	var projectSkillsEvent = {};	// @dataSource
	var combobox2 = {};	// @combobox
	var foundRessourcesEvent = {};	// @dataSource
	var combobox1 = {};	// @combobox
	var cbxSeniority = {};	// @combobox
	var btnFind = {};	// @button
	var button2 = {};	// @button
	var dataGridProject = {};	// @dataGrid
	var button4 = {};	// @button
	var button3 = {};	// @button
	var login1 = {};	// @login
	var selectedRessourcesEvent = {};	// @dataSource
	var btnDel = {};	// @button
	var btnNewPrjSkillsOK = {};	// @button
	var documentEvent = {};	// @document
	var btnNewPrjCancel = {};	// @button
	var btnNewPrjOk = {};	// @button
	var btn_Assign_Cancel = {};	// @button
	var btnAssignOK = {};	// @button
	var btnAssignRes = {};	// @button
	var btnAddProject = {};	// @button
// @endregion// @endlock
    
// eventHandlers// @lock

	removeSkillB.click = function removeSkillB_click (event)// @startlock
	{// @endlock
		if ( sources.projectSkills.length == 0 )
		{
			$$('dataGrid1').addClass('error');
		}
		else
		{
			$$('dataGrid1').removeClass('error');
		}
	};// @lock

	txtNewPrjEnd.change = function txtNewPrjEnd_change (event)// @startlock
	{// @endlock
		if ( objProject.EndDate == null )
		{
			$$('txtNewPrjEnd').addClass('error');
		}
		else
		{
			$$('txtNewPrjEnd').removeClass('error');
		}
	};// @lock

	txtNewPrjStart.change = function txtNewPrjStart_change (event)// @startlock
	{// @endlock
		if ( objProject.StartDate == null )
		{
			$$('txtNewPrjStart').addClass('error');
		}
		else
		{
			$$('txtNewPrjStart').removeClass('error');
		}
	};// @lock

	txtProjectBudget.change = function txtProjectBudget_change (event)// @startlock
	{// @endlock
		if ( objProject.Budget === "" )
		{
			$$('txtProjectBudget').addClass('error');
		}
		else
		{
			$$('txtProjectBudget').removeClass('error');
		}
	};// @lock

	txtNewProjectName.change = function txtNewProjectName_change (event)// @startlock
	{// @endlock
		if ( objProject.Name === "" )
		{
			$$('txtNewProjectName').addClass('error');
		}
		else
		{
			$$('txtNewProjectName').removeClass('error');
		}
	};// @lock

	projectSkillsEvent.onCurrentElementChange = function projectSkillsEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		
		
		if ( sources.projectSkills.getCurrentElement() === null ) 
		{
			waf.widgets.removeSkillB.disable();
		}
		else
		{
			waf.widgets.removeSkillB.enable();
		}
	};// @lock

	combobox2.change = function combobox2_change (event)// @startlock
	{// @endlock
		objProject.PMName = sources.projectManagers.getCurrentElement().name;
		objProject.PMID = sources.projectManagers.getCurrentElement().ID;
		sources.objProject.sync()
	};// @lock

	foundRessourcesEvent.onCurrentElementChange = function foundRessourcesEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var id = event.dataSource.id;
		//sources.employee.query('ID = :1',id);
		$$('imageEmp').setAttribute('src', 'data:image/jpeg;base64,'+RPC.getAvatar(id));
		emplInfo = sources.foundRessources.getCurrentElement();
		sources.emplInfo.sync();
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock

		$$("btnFind").enable();
	};// @lock

	cbxSeniority.change = function cbxSeniority_change (event)// @startlock
	{// @endlock
		$$("btnFind").enable();
	};// @lock

	btnFind.click = function btnFind_click (event)// @startlock
	{// @endlock
		foundRessources = RPC.getEmployees(sources.project.ID, sources.arrSkill.ID, sources.arrSeniority.min, sources.arrSeniority.max);
		
		sources.foundRessources.sync();
	};// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		
		objProject.newP = false;
				
		objProject.Name = sources.project.Name;
		objProject.PMID = sources.PM.ID;
		objProject.PMName = sources.PM.name;
		objProject.ID = sources.project.ID;
		objProject.Budget = sources.project.Budget;
		sources.skills1.toArray('value, ID', {
        	onSuccess: function(ev) 
	        {
	            var arr = ev.result;
	            projectSkills = arr.map(function(a){
	            	return {
	            		ID : a.ID,
	            		skill: a.value
	            	}
	            });
				sources.projectSkills.sync();
	            
	        }
		});
		
		objProject.StartDate = sources.project.StartDate;
		objProject.EndDate = sources.project.EndDate;

		sources.objProject.sync();		
		
		waf.widgets.cntAllProjects.hide();
		waf.widgets.cntNewProject.show();
		waf.widgets.cntAssignRes.hide();
	};// @lock

	dataGridProject.onRowClick = function dataGridProject_onRowClick (event)// @startlock
	{// @endlock
		$$('button4').setValue("Remove Project");
		$$('button4').removeClass('error');
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		if(this.getValue() == "Remove Project"){
			this.setValue("Are you sure ?");
			$$('button4').addClass('error');
			
		}
		else{
				this.setValue("Remove Project");
				$$('button4').removeClass('error');
//				RPC.removeProject(sources.project.ID);
//				sources.project.query();
				var myColl = sources.project.getEntityCollection(); //get the datasource current collection
			    myColl.removeEntity(sources.project.getPosition(),{ //delete the entity
			        onSuccess: function(event){
			            sources.project.query();
			        }
			    }); // replace the collection

				//sources.project.save();
				
		}		
	};// @lock

	button3.click = function button3_click (event)// @startlock
	{// @endlock
		if(selectedRessources.map(function(value){return value.id}).indexOf(sources.foundRessources.id) == -1){
			selectedRessources.push({
				id 			: sources.foundRessources.id 			,
				firstname   : sources.foundRessources.firstname  	,
				lastname	: sources.foundRessources.lastname		,
				title 		: sources.foundRessources.title 		,
				experience 	: sources.foundRessources.experience 	,
				salary 		: sources.foundRessources.salary 		,
				skills 		: sources.foundRessources.skills 		
			});
			sources.selectedRessources.sync();
		}
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		sources.project.all();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		
		$$('btnAssignRes').hide();
		$$('btnAddProject').hide();
		$$('button4').hide();
		$$('button2').hide();
		if ( waf.directory.currentUserBelongsTo('Director') )
		{
			$$('btnAddProject').show();
			$$('button4').show();
			$$('button2').show();
		}
		else if (waf.directory.currentUserBelongsTo('Manager') )
		{
			$$('btnAssignRes').show();
		}
		sources.project.all();
	};// @lock

	selectedRessourcesEvent.onCurrentElementChange = function selectedRessourcesEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		
		if ( sources.selectedRessources.getCurrentElement() === null ) 
		{
			waf.widgets.btnDel.disable();
		}
		else
		{
			waf.widgets.btnDel.enable();
		}
		var id = event.dataSource.id;
		sources.employee.query('ID = :1',id);
		emplInfo = sources.selectedRessources.getCurrentElement();
		sources.emplInfo.sync();
	};// @lock

	selectedRessourcesEvent.onCollectionChange = function selectedRessourcesEvent_onCollectionChange (event)// @startlock
	{// @endlock
		var projectB = sources.project.Budget;
		var employeesB = selectedRessources.reduce(function(pv,cv){return cv.salary + pv}, 0);
		//employeesB += sources.PM.salary;
		$$("budgetProgressBar").setValue(Math.ceil(employeesB * sources.project.businessDays), projectB);
	};// @lock

	btnDel.click = function btnDel_click (event)// @startlock
	{// @endlock
		sources.selectedRessources.removeCurrent();
	};// @lock

	btnNewPrjSkillsOK.click = function btnNewPrjSkillsOK_click (event)// @startlock
	{// @endlock
		//cosmitic
		$$('dataGrid1').removeClass('error');
		
		if(projectSkills.map(function(value) {
			 	return value['ID']; 
			 }).indexOf(sources.skill.ID) == -1)
		{
			projectSkills.push({
				ID : sources.skill.ID,
				skill : sources.skill.value
			});
			sources.projectSkills.sync()
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		
		//code fonctionnel;
		arrSeniority = [{
				value: '0 -> 4 years',
				min: 0,
				max: 4
			},{
				value: '5 -> 8 years',
				min: 5,
				max: 8
			},{
				value: '9 -> 12 years',
				min: 9,
				max: 12
			},{
				value: '13 -> 16 years',
				min: 13,
				max: 16
			},{
				value: 'all',
				min: 0,
				max: 80
			}
		];
		sources.arrSeniority.sync();
		//code design
		
		//Style Code
		$$("container1").center({center : 'h'});
		$$("container11").center({center : 'h'});
		
		$(window).resize(function(){
			$$("container1").center({center : 'h'});
			$$("container11").center({center : 'h'});
		});
		//End Style Code
		waf.widgets.cntAllProjects.show();
		waf.widgets.cntNewProject.hide();
		waf.widgets.cntAssignRes.hide();
		
		projectManagers = RPC.getAllManagers();
		sources.projectManagers.sync();
		
		//add tooltips
		$('#image4')[0].setAttribute('title','Data from Wakanda DataStore');
		$('#image6')[0].setAttribute('title','Data From MySQL');
		$('#image5')[0].setAttribute('title','Data From MySQL');
		$('#image7')[0].setAttribute('title','Data From MySQL');
		$('#image8')[0].setAttribute('title','Data from Wakanda DataStore');
	
	};// @lock

	btnNewPrjCancel.click = function btnNewPrjCancel_click (event)// @startlock
	{// @endlock
		//code fonctionnel;
		
		
		//code design
		waf.widgets.cntAllProjects.show();
		waf.widgets.cntNewProject.hide();
		waf.widgets.cntAssignRes.hide();
		
		$$('txtNewProjectName').removeClass('error');
		$$('dataGrid1').removeClass('error');
		$$('txtProjectBudget').removeClass('error');
		$$('txtNewPrjStart').removeClass('error');
		$$('txtNewPrjEnd').removeClass('error');
	};// @lock

	btnNewPrjOk.click = function btnNewPrjOk_click (event)// @startlock
	{// @endlock
		//wrong input handling
		var bErr = false;
		if ( objProject.Name === "" )
		{
			bErr = true;
			$$('txtNewProjectName').addClass('error');
			
		}
		
		if ( sources.projectSkills.length === 0 )
		{
			bErr = true;
			$$('dataGrid1').addClass('error');
		}
		
		if (objProject.Budget == null )
		{
			$$('txtProjectBudget').addClass('error');
			bErr = true;
		}
		
		if (objProject.StartDate == null )
		{
			$$('txtNewPrjStart').addClass('error');
			bErr = true;
		}
		
		if (objProject.EndDate == null )
		{
			$$('txtNewPrjEnd').addClass('error');
			bErr = true;
		}
		
		if (objProject.EndDate < objProject.StartDate  )
		{
			$$('txtNewPrjEnd').addClass('error');
			$$('txtNewPrjStart').addClass('error');
			bErr = true;
		}
		
		if (bErr)
			return -1;
		
		
		//code fonctionnel;
//		sources.objProject.sync();
		sources.projectSkills.sync();
		var skills = projectSkills.map(function(value){return value['ID']});
//		for(var it in projectSkills){
//			skills.push(projectSkills[it].ID);
//		}
		RPC.addModifProjectAsync({
                'onSuccess': function (result) {
                    sources.project.query();
                },
                'onError': function (error) {
                    
                },
                'params': [objProject, skills]
             });
		
		//code design
		sources.project.query();
		waf.widgets.cntAllProjects.show();
		waf.widgets.cntNewProject.hide();
		waf.widgets.cntAssignRes.hide();
	};// @lock

	btn_Assign_Cancel.click = function btn_Assign_Cancel_click (event)// @startlock
	{// @endlock
		//code fonctionnel;
		
		
		//code design
		waf.widgets.cntAllProjects.show();
		waf.widgets.cntNewProject.hide();
		waf.widgets.cntAssignRes.hide();
	};// @lock

	btnAssignOK.click = function btnAssignOK_click (event)// @startlock
	{// @endlock
		//code fonctionnel;
		RPC.assignEmployeeToProject(selectedRessources.map(function(value) {
			 	return value['id']; 
			 }), sources.project.ID)
		sources.project.query();
//		sources.employees.query();
		//code design
		waf.widgets.cntAllProjects.show();
		waf.widgets.cntNewProject.hide();
		waf.widgets.cntAssignRes.hide();
	};// @lock

	btnAssignRes.click = function btnAssignRes_click (event)// @startlock
	{// @endlock
		$$("btnFind").disable()
		arrskill = sources.skills1.toArray('value, ID',
			function(e){
				
				arrSkill = e.result.map(function(v){
						return {
							value: v.value,
							ID: v.ID
						}
					});
				 arrSkill.push(
					 {
					 	value: 'All',
					 	ID: 0
					 }
				 );
				 sources.arrSkill.sync();
			}
			
		);
		
		sources.arrSkill.sync();
		
		foundRessources = RPC.getEmployees(sources.project.ID);
		
		selectedRessources = RPC.getSelectedEmployees(sources.project.ID);
		
		sources.foundRessources.sync();
		sources.selectedRessources.sync();
		
		waf.widgets.cntAllProjects.hide();
		waf.widgets.cntNewProject.hide();
		waf.widgets.cntAssignRes.show();
	};// @lock

	btnAddProject.click = function btnAddProject_click (event)// @startlock
	{// @endlock

		objProject.newP = true;
		
		objProject.Name 		= "";
		objProject.PMName 		= "";
		objProject.ID 			= 0;
		objProject.Budget 		= null;
		projectSkills 			= [];
		objProject.StartDate 	= null;
		objProject.EndDate 		= null;
		
		sources.objProject.sync();
		sources.projectSkills.sync();
		sources.objProject.sync();
		
		waf.widgets.cntAllProjects.hide();
		waf.widgets.cntNewProject.show();
		waf.widgets.cntAssignRes.hide();
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("removeSkillB", "click", removeSkillB.click, "WAF");
	WAF.addListener("txtNewPrjEnd", "change", txtNewPrjEnd.change, "WAF");
	WAF.addListener("txtNewPrjStart", "change", txtNewPrjStart.change, "WAF");
	WAF.addListener("txtProjectBudget", "change", txtProjectBudget.change, "WAF");
	WAF.addListener("txtNewProjectName", "change", txtNewProjectName.change, "WAF");
	WAF.addListener("projectSkills", "onCurrentElementChange", projectSkillsEvent.onCurrentElementChange, "WAF");
	WAF.addListener("combobox2", "change", combobox2.change, "WAF");
	WAF.addListener("selectedRessources", "onCurrentElementChange", selectedRessourcesEvent.onCurrentElementChange, "WAF");
	WAF.addListener("foundRessources", "onCurrentElementChange", foundRessourcesEvent.onCurrentElementChange, "WAF");
	WAF.addListener("combobox1", "change", combobox1.change, "WAF");
	WAF.addListener("cbxSeniority", "change", cbxSeniority.change, "WAF");
	WAF.addListener("btnFind", "click", btnFind.click, "WAF");
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("dataGridProject", "onRowClick", dataGridProject.onRowClick, "WAF");
	WAF.addListener("button4", "click", button4.click, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("selectedRessources", "onCollectionChange", selectedRessourcesEvent.onCollectionChange, "WAF");
	WAF.addListener("btnDel", "click", btnDel.click, "WAF");
	WAF.addListener("btnNewPrjSkillsOK", "click", btnNewPrjSkillsOK.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("btnNewPrjCancel", "click", btnNewPrjCancel.click, "WAF");
	WAF.addListener("btnNewPrjOk", "click", btnNewPrjOk.click, "WAF");
	WAF.addListener("btn_Assign_Cancel", "click", btn_Assign_Cancel.click, "WAF");
	WAF.addListener("btnAssignOK", "click", btnAssignOK.click, "WAF");
	WAF.addListener("btnAssignRes", "click", btnAssignRes.click, "WAF");
	WAF.addListener("btnAddProject", "click", btnAddProject.click, "WAF");
// @endregion
};// @endlock
