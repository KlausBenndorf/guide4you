const modules = []

export function registerModule (module) {
  modules.push(module)
}

export function getRegisteredModules () {
  return modules
}
