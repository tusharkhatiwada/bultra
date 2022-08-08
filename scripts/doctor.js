/* eslint-disable @typescript-eslint/no-var-requires */

const expectedDependencies = require("expo/bundledNativeModules.json")
const semver = require("semver")
const fs = require("fs")
const path = require("path")
const lockfile = require("@yarnpkg/lockfile")
const meta = require("../package.json")

const OK_EMOJI = "✅"
const NOT_OK_EMOJI = "❌"

const lockFilePath = path.resolve(__dirname, "../yarn.lock")
const lockFileContent = fs.readFileSync(lockFilePath, "utf8")

const foo = lockfile.parse(lockFileContent)
const lockDependencies = Object.entries(foo.object)

const dependencies = Object.entries(meta.dependencies)

let hasError = false

for (const [dependencyName, currentVersion] of dependencies) {
  const expectedVersion = expectedDependencies[dependencyName]

  if (!expectedVersion) {
    continue
  }

  const lockDependency = lockDependencies.filter(([key]) => {
    return key.match(`${dependencyName}@`)
  })

  if (lockDependency.length === 0) {
    continue
  }

  let versionIsOk = false
  let lockVersion

  lockDependency.forEach((dependency) => {
    lockVersion = dependency[1].version
    if (semver.satisfies(lockVersion, expectedVersion)) versionIsOk = true
  })

  if (!versionIsOk) {
    hasError = true
  }

  console.log(`${versionIsOk ? OK_EMOJI : NOT_OK_EMOJI} ${dependencyName}`)
  console.log(`    You have ${lockVersion}`)
  console.log(`    Expecting ${expectedVersion}`)
}

if (hasError) {
  console.error("\nI've found several errors in your dependencies")
  process.exit(1)
}
