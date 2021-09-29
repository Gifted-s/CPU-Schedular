const CPUSchedular = require("../schedular");

describe('Create schedular instance', () => {

    it("must throw error if tasks is undefined ", () => {
        expect(() => new CPUSchedular()).toThrow("Tasks can not be empty");
    })


    it("must throw error if schedular type was not specified ", () => {
        expect(() =>new  CPUSchedular([{
            process: function () {
                return 6
            }
        }], )).toThrow("Specify schedular type (PRIORITY || STACK || QUEUE  )");
    })



    it("must throw error if schedular type is not one of  following (PRIORITY || STACK || QUEUE  )", () => {
        expect(() =>new  CPUSchedular([{
            process: function () {
                return 6
            }
        }], "UNREALISTIC_SCHEDULAR")).toThrow("Schedular type must be either of the following (PRIORITY || STACK || QUEUE  )");
    })



    it("must throw error if a task is without priority and the shedular type is PRIORITY   ", () => {
        expect(() =>new  CPUSchedular([{
            process: function () {
                return 6
            }
        }], "PRIORITY")).toThrow("priority key not found on a task 1 while using schedular type: Priority");
    })
    it("must throw error if a task is without key: process  ", () => {
        expect(() =>new  CPUSchedular([{
        }], "QUEUE")).toThrow("key: process  not found on a task 1");
    })
})


describe('Run Tasks', () => {
     
    it("must run tasks according to priority if schedular type is PRIORITY", () => {
        const cpu_schedular = new CPUSchedular(
            [
                {
                    priority: 10,
                    process: function () {
                        return 10
                    }
                },
                {
                    priority: 6,
                    process: function () {
                        return 6
                    }
                },
                {
                    priority: 31,
                    process: function () {
                        return 31
                    }
                },
                {
                    priority: 5,
                    process: function () {
                        return 5
                    }
                },
                {
                    priority: 9,
                    process: function () {     
                        return 9
                    }
                },
                {
                    priority: 7,
                    process: function () {
                        return 7
                    }
                }
            ],
            "PRIORITY"
        )
        
        expect(cpu_schedular.run()).toEqual([31,10,9,7,6,5])
    })
    it("must run tasks as a queue  if schedular type is QUEUE", () => {
        const cpu_schedular = new CPUSchedular(
            [
                {
                    process: function () {
                        return 10
                    }
                },
                {
                    process: function () {
                        return 6
                    }
                },
                {
                    process: function () {
                        return 31
                    }
                },
                {
                    process: function () {
                        return 5
                    }
                },
                {
                    process: function () {     
                        return 9
                    }
                },
                {
                    process: function () {
                        return 7
                    }
                }
            ],
            "STACK"
        )
        expect(cpu_schedular.run()).toEqual([7,9,5,31,6,10])
    })

    it("must run tasks as a stack  if schedular type is STACK", () => {
        const cpu_schedular = new CPUSchedular(
            [
                {
                
                    process: function () {
                        return 10
                    }
                },
                {
               
                    process: function () {
                        return 6
                    }
                },
                {
                    
                    process: function () {
                        return 31
                    }
                },
                {
                   
                    process: function () {
                        return 5
                    }
                },
                {
                    process: function () {     
                        return 9
                    }
                },
                {
                    process: function () {
                        return 7
                    }
                }
            ],
            "QUEUE"
        )
        expect(cpu_schedular.run()).toEqual([10,6,31,5,9,7])
    })
})



describe('Add New Task', () => {

    it("must throw error if tasks is unedefined ", () => {
        let cpu_schedular =   new  CPUSchedular([], "PRIORITY")
        expect(()=>cpu_schedular.addNewCPUTask()).toThrow("No task is added");
    })

    it("must throw error if a task is without priority and the shedular type is PRIORITY   ", () => {
        let cpu_schedular =   new  CPUSchedular([], "PRIORITY")
        expect(()=>cpu_schedular.addNewCPUTask({
            process: function () {
                return 6
            }
        })).toThrow("priority key not found on this task while using schedular type: Priority");
    })

    it("must throw error if a task is without key: process", () => {
        let cpu_schedular =   new  CPUSchedular([], "QUEUE")
        expect(() =>cpu_schedular.addNewCPUTask({})).toThrow("key: process  not found on a task");
    })
})
