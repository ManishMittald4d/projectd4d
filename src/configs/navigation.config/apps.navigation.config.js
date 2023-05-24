import { APP_PREFIX_PATH } from 'constants/route.constant'
import { NAV_ITEM_TYPE_TITLE, NAV_ITEM_TYPE_COLLAPSE, NAV_ITEM_TYPE_ITEM } from 'constants/navigation.constant'
import { ADMIN, USER ,TEACHER} from 'constants/roles.constant'

const appsNavigationConfig = [
	{
		key: 'apps',
		path: `/dashboard`,
		title: '',
		translateKey: '',
		icon: 'apps',
		type: NAV_ITEM_TYPE_TITLE,
		authority: [ADMIN,USER],
		subMenu: [
			{
				key: 'apps.dashboard',
				path:`/dashboard`,
				title: 'Dashboard',
				translateKey: 'nav.appsProject.dashboard',
				icon: 'project',
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [ADMIN,USER],
				subMenu: [
					{
						key: 'appsProject.institutions',
						path:`/institutions/all`,
						title: 'Institutions',
						translateKey: 'nav.appsProject.institutions',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN,USER],
						subMenu: [
							{
									key: 'appsProject.readability',
									path:`/institution/${1}`,
									title: 'Readability Acadmy',
									translateKey: 'nav.appsProject.readability',
									icon: '',
									type: NAV_ITEM_TYPE_ITEM,
									authority: [ADMIN,USER],
									subMenu: [{
										key: 'appsProject.teacher',
										path:`/teacher/${1}`,
										title: 'Alex Pedia',
										translateKey: 'nav.appsProject.teacher',
										icon: '',
										type: NAV_ITEM_TYPE_ITEM,
										authority: [ADMIN,USER],
										subMenu: [{
											key: 'appsProject.teachers',
											path:`/grade/ist`,
											title: 'Ist Grade',
											translateKey: 'nav.appsProject.teachers',
											icon: '',
											type: NAV_ITEM_TYPE_ITEM,
											authority: [ADMIN,USER],
											subMenu: [{
												key: 'appsProject.Studentname-9',
												path:`/student/${15}`,
												title: 'Riya',
												translateKey: 'nav.appsProject.Studentname',
												icon: '',
												type: NAV_ITEM_TYPE_ITEM,
												authority: [ADMIN,USER],
												subMenu: []
											},{
												key: 'appsProject.Studentname-2',
												path:`/student/${14}`,
												title: 'Sue',
												translateKey: 'nav.appsProject.Studentname',
												icon: '',
												type: NAV_ITEM_TYPE_ITEM,
												authority: [ADMIN,USER],
												subMenu: []
											},{
												key: 'appsProject.Studentname-5',
												path:`/student/${13}`,
												title: 'Laranzo',
												translateKey: 'nav.appsProject.Studentname',
												icon: '',
												type: NAV_ITEM_TYPE_ITEM,
												authority: [ADMIN,USER],
												subMenu: []
											}]
										},{
											key: 'appsProject.teacher',
											path:`/grade/4th`,
											title: '4th Grade',
											translateKey: 'nav.appsProject.teacher',
											icon: '',
											type: NAV_ITEM_TYPE_ITEM,
											authority: [ADMIN,USER],
											subMenu: [{
												key: 'appsProject.Studentname-3',
												path:`/student/${1}`,
												title: 'Namrata',
												translateKey: 'nav.appsProject.Studentname',
												icon: '',
												type: NAV_ITEM_TYPE_ITEM,
												authority: [ADMIN,USER],
												subMenu: []
											},{
												key: 'appsProject.Studentname-7',
												path:`/student/${2}`,
												title: 'Saras',
												translateKey: 'nav.appsProject.Studentname',
												icon: '',
												type: NAV_ITEM_TYPE_ITEM,
												authority: [ADMIN],
												subMenu: []
											},{
												key: 'appsProject.Studentname-4',
												path:`/student/${4}`,
												title: 'Haiya',
												translateKey: 'nav.appsProject.Studentname',
												icon: '',
												type: NAV_ITEM_TYPE_ITEM,
												authority: [ADMIN,USER],
												subMenu: []
											}]
										}]
									},{
										key: 'appsProject.teachersname',
										path:`/teacher/${2}`,
										title: 'Sara Lee',
										translateKey: 'nav.appsProject.teachersname',
										icon: '',
										type: NAV_ITEM_TYPE_ITEM,
										authority: [ADMIN,USER],
										subMenu: [{
											key: 'appsProject.Studentname-6',
											path:`/student/${8}`,
											title: 'MeriJo',
											translateKey: 'nav.appsProject.Studentname',
											icon: '',
											type: NAV_ITEM_TYPE_ITEM,
											authority: [ADMIN,USER],
											subMenu: []
										},{
											key: 'appsProject.Studentname-8',
											path:`/student/${9}`,
											title: 'Aratika',
											translateKey: 'nav.appsProject.Studentname',
											icon: '',
											type: NAV_ITEM_TYPE_ITEM,
											authority: [ADMIN,USER],
											subMenu: []
										}]
									}]
							}
						]
					},
			
				]
			},
			{
				key: 'appcrm.reports',
				path:`/reports/`,
				title: 'Reports',
				translateKey: 'nav.appsCrm.reports',
				icon: 'project',
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [ADMIN],
				subMenu: []
			},

			
			{
				key: 'apps.classess',
				path:'/classess/',
				title: 'Classess',
				translateKey: 'nav.appsCrm.classess',
				icon: 'crm',
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [ADMIN],
				subMenu: [
				
					{
						key: 'appsCrm.kg-101',
						path: `/KG-101`,
						title: 'KG-101',
						translateKey: 'nav.appsCrm.kg-101',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN],
						subMenu: [{
							key: 'appsCrm.rose',
							path:`/student/${16}`,
							title: 'Rose',
							translateKey: 'nav.appsCrm.rose',
							icon: '',
							type: NAV_ITEM_TYPE_ITEM,
							authority: [ADMIN],
							subMenu: []
						},{
							key: 'appsCrm.kate',
							path:`/student/${17}`,
							title: 'Kate',
							translateKey: 'nav.appsCrm.kate',
							icon: '',
							type: NAV_ITEM_TYPE_ITEM,
							authority: [ADMIN],
							subMenu: []
						}]
					},
                   
					{
						key: 'appsCrm.kg-102',
						path: `/KG-102`,
						title: 'KG-102',
						translateKey: 'nav.appsCrm.kg-102',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN],
						subMenu: []
					},
					{
						key: 'appsCrm.Ist-202',
						path: `/Ist-202`,
						title: 'Ist-202',
						translateKey: 'nav.appsCrm.Ist-202',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN],
						subMenu: []
					},
				
					
				
				]
			},
			 
                         {
				key: 'appcrm.books',
				path:`/books/`,
				title: 'Libaray',
				translateKey: 'nav.appsCrm.books',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [ADMIN],
				subMenu: []
			},
			{
				key: 'appsCrm.support',
				path:`https://www.readabilitytutor.com/support/`,
				title: 'Support',
				translateKey: 'nav.appsCrm.libaray',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [USER,TEACHER],
				subMenu: []
			},
			{
				key: 'appsCrm.faq',
				path:`https://www.readabilitytutor.com/edu/faqs/`,
				title: 'Faq',
				translateKey: 'nav.appsCrm.libaray',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [USER,],
				subMenu: []
			},
			{
				key: 'apps.zendesk',
				path:'',
				title: 'Zendesk Ticket',
				translateKey: 'nav.appsCrm.zendesk',
				icon: 'crm',
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [ADMIN],
				subMenu: [
				
					{
						key: 'appsCrm.kg-101',
						path: `/zendesk-summary`,
						title: 'Summary',
						translateKey: 'nav.appsCrm.kg-101',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN],
						subMenu: []
					},
                   
					{
						key: 'appsCrm.kg-102',
						path: `/zendesk-details`,
						title: 'Details',
						translateKey: 'nav.appsCrm.kg-102',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN],
						subMenu: []
					},
					
				
					
				
				]
			},
		
	
		]
	}
	
]


export const appsNavigationConfig2 = [
	{
		key: 'apps',
		path: `/dashboard`,
		title: '',
		translateKey: '',
		icon: 'apps',
		type: NAV_ITEM_TYPE_TITLE,
		authority: [ADMIN,USER],
		subMenu: [
			{
				key: 'apps.dashboard',
				path:`/dashboard`,
				title: 'Dashboard',
				translateKey: 'nav.appsProject.readability',
				icon: 'project',
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [ADMIN,USER],
				subMenu: []
			},
			{
				key: 'apps.institution',
				path:`/institution/${1}`,
				title: 'Dashboard 1',
				translateKey: 'nav.appsProject.readability',
				icon: 'project',
				type: NAV_ITEM_TYPE_COLLAPSE,
				authority: [ADMIN,USER],
				subMenu: []
			},
			
			{
				key: 'appsProject.teacher',
				path:`/teacher/${1}`,
				title: 'Alex Pedia',
				translateKey: 'nav.appsProject.teacher',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [ADMIN,USER],
				subMenu: [{
					key: 'appsProject.teachers',
					path:`/grade/ist`,
					title: 'Ist Grade',
					translateKey: 'nav.appsProject.teachers',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER],
					subMenu: [{
						key: 'appsProject.Studentname-9',
						path:`/student/${15}`,
						title: 'Riya',
						translateKey: 'nav.appsProject.Studentname',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN,USER],
						subMenu: []
					},{
						key: 'appsProject.Studentname-2',
						path:`/student/${14}`,
						title: 'Sue',
						translateKey: 'nav.appsProject.Studentname',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN,USER],
						subMenu: []
					},{
						key: 'appsProject.Studentname-5',
						path:`/student/${13}`,
						title: 'Laranzo',
						translateKey: 'nav.appsProject.Studentname',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN,USER],
						subMenu: []
					}]
				},{
					key: 'appsProject.teacher',
					path:`/grade/4th`,
					title: '4th Grade',
					translateKey: 'nav.appsProject.teacher',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER],
					subMenu: [{
						key: 'appsProject.Studentname-3',
						path:`/student/${1}`,
						title: 'Namrata',
						translateKey: 'nav.appsProject.Studentname',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN,USER],
						subMenu: []
					},{
						key: 'appsProject.Studentname-7',
						path:`/student/${2}`,
						title: 'Saras',
						translateKey: 'nav.appsProject.Studentname',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN],
						subMenu: []
					},{
						key: 'appsProject.Studentname-4',
						path:`/student/${4}`,
						title: 'Haiya',
						translateKey: 'nav.appsProject.Studentname',
						icon: '',
						type: NAV_ITEM_TYPE_ITEM,
						authority: [ADMIN,USER],
						subMenu: []
					}]
				}]
			},
			{
				key: 'appsProject.teachersname',
				path:`/teacher/${2}`,
				title: 'Sara Lee',
				translateKey: 'nav.appsProject.teachersname',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [ADMIN,USER],
				subMenu: [{
					key: 'appsProject.Studentname-6',
					path:`/student/${8}`,
					title: 'MeriJo',
					translateKey: 'nav.appsProject.Studentname',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER],
					subMenu: []
				},{
					key: 'appsProject.Studentname-8',
					path:`/student/${9}`,
					title: 'Aratika',
					translateKey: 'nav.appsProject.Studentname',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER],
					subMenu: []
				}]
			},
			 
                        
             {
				key: 'appcrm.books',
				path:`/books/`,
				title: 'Libaray',
				translateKey: 'nav.appsCrm.books',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [USER,TEACHER],
				subMenu: []
			},
                        
			{
				key: 'appsCrm.support',
				path:`https://www.readabilitytutor.com/support/`,
				title: 'Support',
				translateKey: 'nav.appsCrm.libaray',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [USER,TEACHER],
				subMenu: []
			},
			{
				key: 'appsCrm.faq',
				path:`https://www.readabilitytutor.com/edu/faqs/`,
				title: 'Faq',
				translateKey: 'nav.appsCrm.libaray',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [USER,],
				subMenu: []
			},
		
		
			// },
		]
	}			
	
]


export const appsNavigationConfig3 = [
	{
		key: 'apps',
		path: `/dashboard`,
		title: '',
		translateKey: '',
		icon: 'apps',
		type: NAV_ITEM_TYPE_TITLE,
		authority: [ADMIN,USER,TEACHER],
		subMenu: [
			{
				key: 'appsProject.teacher',
				path:`/dashboard`,
				title: 'Dashboard',
				translateKey: 'nav.appsProject.teacher',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [ADMIN,USER,TEACHER],
				subMenu: []
			},
			{
				key: 'appsProject.teacher',
				path:`/teacher/${1}`,
				title: 'Dashboard 1',
				translateKey: 'nav.appsProject.teacher',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [ADMIN,USER,TEACHER],
				subMenu: []
			},
			{
				key: 'appsProject.teachers',
				path:`/grade/ist`,
				title: 'Ist Grade',
				translateKey: 'nav.appsProject.teachers',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [ADMIN,USER,TEACHER],
				subMenu: [{
					key: 'appsProject.Studentname-9',
					path:`/student/${15}`,
					title: 'Riya',
					translateKey: 'nav.appsProject.Studentname',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER,TEACHER],
					subMenu: []
				},{
					key: 'appsProject.Studentname-2',
					path:`/student/${14}`,
					title: 'Sue',
					translateKey: 'nav.appsProject.Studentname',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER,TEACHER],
					subMenu: []
				},{
					key: 'appsProject.Studentname-5',
					path:`/student/${13}`,
					title: 'Laranzo',
					translateKey: 'nav.appsProject.Studentname',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER,TEACHER],
					subMenu: []
				}]
			},
			{
				key: 'appsProject.teacher',
				path:`/grade/4th`,
				title: '4th Grade',
				translateKey: 'nav.appsProject.teacher',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [ADMIN,USER,TEACHER],
				subMenu: [{
					key: 'appsProject.Studentname-3',
					path:`/student/${1}`,
					title: 'Namrata',
					translateKey: 'nav.appsProject.Studentname',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER,TEACHER],
					subMenu: []
				},{
					key: 'appsProject.Studentname-7',
					path:`/student/${2}`,
					title: 'Saras',
					translateKey: 'nav.appsProject.Studentname',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,TEACHER],
					subMenu: []
				},{
					key: 'appsProject.Studentname-4',
					path:`/student/${4}`,
					title: 'Haiya',
					translateKey: 'nav.appsProject.Studentname',
					icon: '',
					type: NAV_ITEM_TYPE_ITEM,
					authority: [ADMIN,USER,TEACHER],
					subMenu: []
				}]
			},
			{
				key: 'appcrm.books',
				path:`/books/`,
				title: 'Libaray',
				translateKey: 'nav.appsCrm.books',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [USER,TEACHER],
				subMenu: []
			},

			{
				key: 'appsCrm.support',
				path:`https://www.readabilitytutor.com/support/`,
				title: 'Support',
				translateKey: 'nav.appsCrm.libaray',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [USER,TEACHER],
				subMenu: []
			},
			{
				key: 'appsCrm.faq',
				path:`https://www.readabilitytutor.com/edu/faqs/`,
				title: 'Faq',
				translateKey: 'nav.appsCrm.libaray',
				icon: 'project',
				type: NAV_ITEM_TYPE_ITEM,
				authority: [USER,TEACHER],
				subMenu: []
			},
			
		
			
		]
	}			
	
]
export default appsNavigationConfig

