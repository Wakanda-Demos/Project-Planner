
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button2 = {};	// @button
	var btnAddModifPrjOk = {};	// @button
	var button3 = {};	// @button
	var btnAddModifPrjRemSkills = {};	// @button
	var txtNewPrjEnd = {};	// @textField
	var txtNewPrjStart = {};	// @textField
	var txtProjectBudget = {};	// @textField
	var txtNewProjectName = {};	// @textField
	var projectSkillsEvent = {};	// @dataSource
	var comboboxAddModifManager = {};	// @combobox
	var foundRessourcesEvent = {};	// @dataSource
	var combobox1 = {};	// @combobox
	var cbxSeniority = {};	// @combobox
	var btnFind = {};	// @button
	var buttonEditProject = {};	// @button
	var dataGridProject = {};	// @dataGrid
	var buttonDeleteProject = {};	// @button
	var login1 = {};	// @login
	var selectedRessourcesEvent = {};	// @dataSource
	var btnDel = {};	// @button
	var btnAddModifPrjAddSkill = {};	// @button
	var documentEvent = {};	// @document
	var btnAddModifPrjCancel = {};	// @button
	var btn_Assign_Cancel = {};	// @button
	var btnAssignOK = {};	// @button
	var btnAssignRes = {};	// @button
	var buttonAddProject = {};	// @button
// @endregion// @endlock
    
// eventHandlers// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		var boxValue = $$("cbxRoles").getValue();
		var splited = boxValue.split('/');
		var user = splited[0],
			password = splited[1];
		if (RPC.login(user, password))
			location.href = "/";
	};// @lock

	btnAddModifPrjOk.click = function btnAddModifPrjOk_click ()// @startlock
	{// @endlock
		//wrong input handling
		
		/**
		*	Verify the inputs
		*	Sent the request to the server via RPC
		*/
		var bErr = false;
		if ( objProject.Name === "" )
		{
			bErr = true;
			$$('txtNewProjectName').addClass('error');
			
		}
		
		if ( sources.projectSkills.length === 0 )
		{
			bErr = true;
			$$('datagridAddModifSkills').addClass('error');
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
		//	Extract the IDs of the selected skills from the datasource projectSkills
		sources.projectSkills.sync();
		var skillsIDs = projectSkills.map(
			function(value){
				return value['ID']
			}
		);
		// Call the methode addModifProjectAsync() the asynchrone version of addModifProject (addModifProject is defined on Modules/rpcModule.js)
		RPC.addModifProjectAsync({
                'onSuccess': function (result) {
                    sources.project.query();
                },
                'onError': function (error) {
                    
                },
                'params': [objProject, skillsIDs]
             }
        );
		//	Synchronize the datasource
		sources.project.query();
		//	Switch the view
		showView("Home");
	};// @lock

	button3.click = function button3_click ()// @startlock
	{// @endlock
		//	Extract the selected resources IDs
		var selectedRessourcesIDs = selectedRessources.map(
			function(value){
				return value.id
			}
		);
		//	Make sure that the resource to add does not already added and add if
		if(selectedRessourcesIDs.indexOf(sources.foundRessources.id) == -1){
			selectedRessources.push({
				id 			: sources.foundRessources.id 			,
				firstname   : sources.foundRessources.firstname  	,
				lastname	: sources.foundRessources.lastname		,
				title 		: sources.foundRessources.title 		,
				experience 	: sources.foundRessources.experience 	,
				salary 		: sources.foundRessources.salary 		,
				skills 		: sources.foundRessources.skills 		
			});
			//	Select the added employee in the selectedResources grid
			sources.selectedRessources.selectByKey(sources.foundRessources.id);
			//	Synchronize the datasource
			sources.selectedRessources.sync();
		}
	};// @lock

	btnAddModifPrjRemSkills.click = function btnAddModifPrjRemSkills_click ()// @startlock
	{// @endlock
		/**
		*	Validation of content,
		*	we don't need to write code for deletion of the skill,
		*	because the botton is binded with the datasource,
		*	and we specified the remove action on the proprties of the botton
		*/
		
		if ( sources.projectSkills.length == 0 )
		{
			$$('datagridAddModifSkills').addClass('error');
		}
		else
		{
			$$('datagridAddModifSkills').removeClass('error');
		}
	};// @lock

	txtNewPrjEnd.change = function txtNewPrjEnd_change (event)// @startlock
	{// @endlock
		/**
		*	Validation of content
		*/		
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
		/**
		*	Validation of content
		*/
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
		/**
		*	Validation of content
		*/
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
		/**
		*	Validation of content
		*/
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
		/**
		*	Disable the button remove skill, if there is no skill to remove
		*/
		if ( sources.projectSkills.getCurrentElement() === null ) 
		{
			waf.widgets.btnAddModifPrjRemSkills.disable();
		}
		else
		{
			waf.widgets.btnAddModifPrjRemSkills.enable();
		}
	};// @lock

	comboboxAddModifManager.change = function comboboxAddModifManager_change (event)// @startlock
	{// @endlock
		
		objProject.PMName = sources.projectManagers.getCurrentElement().name;
		objProject.PMID = sources.projectManagers.getCurrentElement().ID;
		sources.objProject.sync()
	};// @lock

	foundRessourcesEvent.onCurrentElementChange = function foundRessourcesEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		//	The id of curent element on foundRessources datasource
		var id = event.dataSource.id;
		//	set the avatar of selected employee
		$$('imageEmp').setValue('data:image/jpeg;base64,'+RPC.getAvatar(id));
		//	Set informations of selected employee
		emplInfo = sources.foundRessources.getCurrentElement();
		//	Synchronize the datasource
		sources.emplInfo.sync();
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		//	Enable the Apply button
		$$("btnFind").enable();
	};// @lock

	cbxSeniority.change = function cbxSeniority_change (event)// @startlock
	{// @endlock
		//	Enable the Apply button
		$$("btnFind").enable();
	};// @lock

	btnFind.click = function btnFind_click (event)// @startlock
	{// @endlock
		/**
		*	Receive the employees that meet the filter
		*	and synchronize the datasource
		*/
		foundRessources = RPC.getEmployees(
			sources.project.ID,
			sources.arrSkill.ID,
			sources.arrSeniority.min,
			sources.arrSeniority.max
		);

		sources.foundRessources.sync();
	
	};// @lock

	buttonEditProject.click = function buttonEditProject_click (event)// @startlock
	{// @endlock
		/**
		*	Put the informations about the selected project on the objProject, from the 'dataGridProject'
		*	Put the informations about the skills of the selected project on the projectSkills, from the 'dataGridSkills'
		*
		*	Synchronize the datasources objProject and projectSkills to show our modifications on the 'cntCeateModifyProject' vue
		*	and modify the shown vews
		*/
		
		//	The variable newP will be sent to the server, false indicate that this is not a new project (we want to modify an existing project)
		objProject.newP = false;
		//	Set the informations about the selected project on objProject, (objProject is binded to cntCeateModifyProject view)
		objProject.Name = sources.project.Name;
		objProject.PMID = sources.PM.ID;
		objProject.PMName = sources.PM.name;
		objProject.ID = sources.project.ID;
		objProject.Budget = sources.project.Budget;
		objProject.StartDate = sources.project.StartDate;
		objProject.EndDate = sources.project.EndDate;
		//	Put the (value,ID) of the skills on the projectSkills datasource
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
	            // Synchronize the datasource projectSkills
				sources.projectSkills.sync();
	        }
		});
		
        //	Synchronize the datasource objProject
		sources.objProject.sync();		
		showView("Edit Project");
	};// @lock

	dataGridProject.onRowClick = function dataGridProject_onRowClick (event)// @startlock
	{// @endlock
		/**
		*	Change the appearance of the delete button 'buttonDeleteProject'
		*	the appearence changes also when you click on it (buttonDeleteProject), for the confirmation
		*/
		
		//	Reset the delete button text
		$$('buttonDeleteProject').setValue("Remove Project");
		//	Reset the button appearence 
		$$('buttonDeleteProject').removeClass('error');
	};// @lock

	buttonDeleteProject.click = function buttonDeleteProject_click (event)// @startlock
	{// @endlock

		/**
		*	We ask the user to be sure, before deleting the selected project
		*	On the first click we modify the text and the appearence of the button
		*	On the secend click, we remove the project
		*/

		// If this is the first click
		if(this.getValue() == "Remove Project"){
			this.setValue("Are you sure ?");
			$$('buttonDeleteProject').addClass('error');
			
		}
		// If this is the second click (the confirmation)
		else{
			// reset the content and the appearence of the button (for others projects)
			this.setValue("Remove Project");
			$$('buttonDeleteProject').removeClass('error');
			//	Get the datasource current collection
			var projectCollection = sources.project.getEntityCollection(); 
			//	Delete the entity ascociated with the selected project 
			//	NB : Employees and the skills of this project are automatically deleted in model.Project.events.onRemove() (server side)
		    projectCollection.removeEntity(sources.project.getPosition(),{
		        onSuccess: function(event){
		        	// Synchronize the datasource to show only the remaining projects
		            sources.project.query();
		        }
		    });
		}		
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		showView("Home");
		//	Synchronize datasource project		
		sources.project.all();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		showView("Home");
	};// @lock

	selectedRessourcesEvent.onCurrentElementChange = function selectedRessourcesEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		//	Desable the button remove if there is no selected employee
		if ( sources.selectedRessources.getCurrentElement() === null ) 
		{
			waf.widgets.btnDel.disable();
		}
		else
		{
			waf.widgets.btnDel.enable();
		}
		//	The id of curent element on foundRessources datasource
		var id = event.dataSource.id;
		//	Set the avatar of selected employee
		$$('imageEmp').setValue('data:image/jpeg;base64,'+RPC.getAvatar(id));
		//	Set informations of selected employee
		emplInfo = sources.selectedRessources.getCurrentElement();
		//	Synchronize the datasource
		sources.emplInfo.sync();
	};// @lock

	selectedRessourcesEvent.onCollectionChange = function selectedRessourcesEvent_onCollectionChange (event)// @startlock
	{// @endlock
		/**
		*	Update the progress bar
		*/
		//	Maximum budget of project
		var projectB = sources.project.Budget;
		//	Sum of employees salary
		var employeesB = selectedRessources.reduce(
			function(pv,cv){
				return cv.salary + pv
			},
			0
		);
		//	update the progress bar
		$$("budgetProgressBar").setValue(Math.ceil(employeesB * sources.project.businessDays), projectB);
	};// @lock

	btnDel.click = function btnDel_click (event)// @startlock
	{// @endlock
		// Remove the selected resource from the datasource
		sources.selectedRessources.removeCurrent();
	};// @lock

	btnAddModifPrjAddSkill.click = function btnAddModifPrjAddSkill_click (event)// @startlock
	{// @endlock
		//	Reset the appearance of the grid
		$$('datagridAddModifSkills').removeClass('error');
		//	Extract the IDs of selected skills
		var projectSkillsIDs = projectSkills.map(
			function(value) {
			 	return value['ID']; 
			}
		);
		//	Check that skill selected on the aviable skills datagrid is not already added
		if(projectSkillsIDs.indexOf(sources.skill.ID) == -1)
		{
			// Add the selected skill
			projectSkills.push({
				ID : sources.skill.ID,
				skill : sources.skill.value
			});
			//	Synchronize the datasource
			sources.projectSkills.sync()
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
		showView = function (view){
			
			//	Show te appropriates buttons, based on he user 

			/**
			*	Director can
			*		Add project
			*		Edit project
			*		Delete project
			*	Managaer can
			*		Assigne resources to his project
			*	Employee can not assign or change
			*/
			
			waf.widgets.cntAllProjects.hide(); 
			waf.widgets.cntCeateModifyProject.hide(); 
			waf.widgets.cntAssignRes.hide();
			waf.widgets.cntLogin.hide();

			$$('btnAssignRes').hide();
			$$('buttonAddProject').hide();
			$$('buttonDeleteProject').hide();
			$$('buttonEditProject').hide();

			if(WAF.directory.currentUser() === null){
				waf.widgets.cntLogin.show();
				$$('login1').hide();
			}
			else{

				sources.project.all();
				
				$$('login1').show();
				
				switch(view){
					case 'Add Project':
					case 'Edit Project':
						//	Show the view cntCeateModifyProject
						waf.widgets.cntCeateModifyProject.show();
					break;
					case 'Assign Resources':
						// Show "Assign Resources" views
						waf.widgets.cntAssignRes.show();
					break;
					case 'Home':
						//	Show home view
						waf.widgets.cntAllProjects.show(); 
					break;
				}

				if ( waf.directory.currentUserBelongsTo('Director') )
				{
					$$('buttonDeleteProject').show();
					$$('buttonEditProject').show();
					$$('buttonAddProject').show();
				}
				else if (waf.directory.currentUserBelongsTo('Manager') )
				{
					$$('btnAssignRes').show();
				}

			}// End else
		}

		/**
		*	@arrSeniority contain the ranges of expertises, this datasource is bined to the ComboBox cbxSeniority
		*/

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
		
		//	Style Code
		$$("container1").center({center : 'h'});
		$$("container11").center({center : 'h'});
		
		//	
		$(window).resize(function(){
			$$("container1").center({center : 'h'});
			$$("container11").center({center : 'h'});
		});
		
		//	show home view
		showView("Home");
		//	Feeding the datastores
		projectManagers = RPC.getAllManagers();
		sources.projectManagers.sync();
		
		//	Add tooltips
		$('#image4')[0].setAttribute('title','Data from Wakanda DataStore');
		$('#image6')[0].setAttribute('title','Data From MySQL');
		$('#image5')[0].setAttribute('title','Data From MySQL');
		$('#image7')[0].setAttribute('title','Data From MySQL');
		$('#image8')[0].setAttribute('title','Data from Wakanda DataStore');
	
	};// @lock

	btnAddModifPrjCancel.click = function btnAddModifPrjCancel_click (event)// @startlock
	{// @endlock
		/**
		*	Cancel the changes or the modification
		*/

		//	Show the projects view and hide other containers
		showView('Home');
		//	Reset the appearence of the test inputs...
		$$('txtNewProjectName').removeClass('error');
		$$('datagridAddModifSkills').removeClass('error');
		$$('txtProjectBudget').removeClass('error');
		$$('txtNewPrjStart').removeClass('error');
		$$('txtNewPrjEnd').removeClass('error');
	};// @lock

	btn_Assign_Cancel.click = function btn_Assign_Cancel_click (event)// @startlock
	{// @endlock
		// Show the Home view (cntAllProjects) and hide the other containers
		showView("Home")
	};// @lock

	btnAssignOK.click = function btnAssignOK_click (event)// @startlock
	{// @endlock
		//	Extract an IDs array of selected resources 
		var selectedResourcesIDs = selectedRessources.map(
			function(value) {
				return value['id']; 
			}
		);
		//	ID of selected Project
		var selectedProjectID =  sources.project.ID;
		//	Call the assignEmployeeToProject RPC function
		RPC.assignEmployeeToProject(selectedResourcesIDs,selectedProjectID);
		//	Synchronize the datasource
		sources.project.query();
		//	Switch the view
		showView('Home');
	};// @lock

	btnAssignRes.click = function btnAssignRes_click (event)// @startlock
	{// @endlock

		/**
		*	Reset the filters
		*/

		$$("btnFind").disable();
		//	Show in the combobox just the skills on the project
		sources.skills1.toArray('value, ID',
			function(e){
				arrSkill = e.result.map(function(v){
						return {
							value: v.value,
							ID: v.ID
						}
					}
				);
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
		//	get founded and assigned (selected) resources from the server
		foundRessources = RPC.getEmployees(sources.project.ID);
		selectedRessources = RPC.getSelectedEmployees(sources.project.ID);
		
		sources.foundRessources.sync();
		sources.selectedRessources.sync();
		// switch views
		showView("Assign Resources");
	};// @lock

	buttonAddProject.click = function buttonAddProject_click (event)// @startlock
	{// @endlock

		/**
		*	Clean objProject and projectSkills
		*	Synchronize the datasources objProject and  to show our modifications on the 'cntCeateModifyProject' view
		*	and modify the shown vews
		*/

		//	The variable newP will be sent to the server, true indicate that this is a new project to add
		objProject.newP = true;
		
		objProject.Name 		= "";
		objProject.PMName 		= "";
		objProject.ID 			= 0;
		objProject.Budget 		= null;
		projectSkills 			= [];
		objProject.StartDate 	= null;
		objProject.EndDate 		= null;
		
        //	Synchronize the datasource objProject
		sources.objProject.sync();
        //	Synchronize the datasource projectSkills
		sources.projectSkills.sync();

		// switch the view
		showView('Add Project');
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("btnAddModifPrjOk", "click", btnAddModifPrjOk.click, "WAF");
	WAF.addListener("button3", "click", button3.click, "WAF");
	WAF.addListener("btnAddModifPrjRemSkills", "click", btnAddModifPrjRemSkills.click, "WAF");
	WAF.addListener("txtNewPrjEnd", "change", txtNewPrjEnd.change, "WAF");
	WAF.addListener("txtNewPrjStart", "change", txtNewPrjStart.change, "WAF");
	WAF.addListener("txtProjectBudget", "change", txtProjectBudget.change, "WAF");
	WAF.addListener("txtNewProjectName", "change", txtNewProjectName.change, "WAF");
	WAF.addListener("projectSkills", "onCurrentElementChange", projectSkillsEvent.onCurrentElementChange, "WAF");
	WAF.addListener("comboboxAddModifManager", "change", comboboxAddModifManager.change, "WAF");
	WAF.addListener("selectedRessources", "onCurrentElementChange", selectedRessourcesEvent.onCurrentElementChange, "WAF");
	WAF.addListener("foundRessources", "onCurrentElementChange", foundRessourcesEvent.onCurrentElementChange, "WAF");
	WAF.addListener("combobox1", "change", combobox1.change, "WAF");
	WAF.addListener("cbxSeniority", "change", cbxSeniority.change, "WAF");
	WAF.addListener("btnFind", "click", btnFind.click, "WAF");
	WAF.addListener("buttonEditProject", "click", buttonEditProject.click, "WAF");
	WAF.addListener("dataGridProject", "onRowClick", dataGridProject.onRowClick, "WAF");
	WAF.addListener("buttonDeleteProject", "click", buttonDeleteProject.click, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("selectedRessources", "onCollectionChange", selectedRessourcesEvent.onCollectionChange, "WAF");
	WAF.addListener("btnDel", "click", btnDel.click, "WAF");
	WAF.addListener("btnAddModifPrjAddSkill", "click", btnAddModifPrjAddSkill.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("btnAddModifPrjCancel", "click", btnAddModifPrjCancel.click, "WAF");
	WAF.addListener("btn_Assign_Cancel", "click", btn_Assign_Cancel.click, "WAF");
	WAF.addListener("btnAssignOK", "click", btnAssignOK.click, "WAF");
	WAF.addListener("btnAssignRes", "click", btnAssignRes.click, "WAF");
	WAF.addListener("buttonAddProject", "click", buttonAddProject.click, "WAF");
// @endregion
};// @endlock
