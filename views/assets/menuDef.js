module.exports = {
	items :[
		{
			name: "Welcome",
			link: "/m/main/",
			icon: "fa-home",
			roles: "customer"
		},
		{
			name: "Dashboard",
			link: "/",
			icon: "fa-tachometer",
			roles: "exec,vManager"
		},
		{
			name: "My Visits",
			link: "/m/visits/#/visits/all/my",
			icon: "fa-calendar",
			roles: "user,vManager"
		},
		{
			name: "Exec Visits",
			link: "/m/visits/#/visits/all/exec",
			icon: "fa-calendar",
			roles: "exec,vManager"
		},
		{
			name: "Add Visit",
			link: "/m/visit/add/#/add",
			icon: "fa-plus",
			roles: "user,vManager"
		},
		{
			name: "Agenda",
			link: "/m/visits/#/agenda",
			icon: "fa-list",
			roles: "user,customer,exec,vManager"
		},
		
		{
			name: "Exec Bios",
			link: "/m/main/#/execBios",
			icon: "fa-group",
			roles: "user,customer,exec,vManager"
		},
		{
			name: "Contacts",
			link: "/m/visits/#/contacts",
			icon: "fa-phone",
			roles: "user,exec,customer,vManager"
		},
		{
			name: "Quick Facts",
			link: "/m/facts/#/main",
			icon: "fa-line-chart",
			roles: "user,exec,customer,vManager"
		},
		{
			name: "Feedback",
			link: "/m/main/#/feedback",
			icon: "fa-comments",
			roles: "exec,customer"
		},
		{
			name: "Logout",
			link: "/logout",
			icon: "fa-sign-out",
			roles: "user,exec,customer,vManager"
		}
	]
}
