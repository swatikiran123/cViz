module.exports = {
	items :[
		{
			name: "Welcome",
			link: "/m/main/",
			icon: "fa-home",
			roles: "customer"
		},
		// {
		// 	name: "Dashboard",
		// 	link: "/",
		// 	icon: "fa-tachometer",
		// 	roles: "exec,vManager,admin"
		// },
		{
			name: "My Visits",
			link: "/m/visits/#/visits/all/my",
			icon: "fa-plane",
			roles: "user,vManager,admin"
		},
		{
			name: "Exec Visits",
			link: "/m/visits/#/visits/all/exec",
			icon: "fa-calendar",
			roles: "exec,vManager,admin"
		},
		{
			name: "Add Visit",
			link: "/m/visit/add/#/add",
			icon: "fa-plus",
			roles: "user,vManager,admin"
		},
		{
			name: "Agenda",
			link: "/m/visits/#/agenda",
			icon: "fa-calendar",
			roles: "user,customer,exec,vManager,admin"
		},
		
		{
			name: "Exec Bios",
			link: "/m/visits/#/execBios",
			icon: "fa-group",
			roles: "user,customer,exec,vManager,admin"
		},
		{
			name: "Contacts",
			link: "/m/visits/#/contacts",
			icon: "fa-phone",
			roles: "user,exec,customer,vManager,admin"
		},
		{
			name: "Quick Facts",
			link: "/m/facts/#/main",
			icon: "fa-line-chart",
			roles: "user,exec,customer,vManager,admin"
		},
		{
			name: "Feedback",
			link: "/m/visits/#/feedback",
			icon: "fa-comments",
			roles: "exec,customer"
		},
		{
			name: "Logout",
			link: "/logout",
			icon: "fa-sign-out",
			roles: "user,exec,customer,vManager,admin"
		}
	]
}
