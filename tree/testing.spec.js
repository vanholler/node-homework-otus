const mock = require('mock-fs')
const fs = require('fs')
const getTree = require('../tree')
const nodePath = require('path');

const folder1 = 'fake-folder1'
const folder2 = 'fake-folder2'
const items = {
  'file1.js': '',
  'file2.js': '',
}

beforeEach(() => {
  mock({
    [`${folder1}/${folder2}`]: mock.directory({
      items
    })
  })
})

afterEach(mock.restore)

const rootDir = process.cwd()
let contents = fs.readdirSync(rootDir);

describe('test print-tree', () => {
    it('shoud print tree', async () => {
        const maxDepth = 3
        const tree = getTree.tree(rootDir, maxDepth)
        const files = Object.keys(items)
        console.log(tree)
        expect(tree)
    })

    test('maxDepth1', () => {
      expect(getTree.print(
        nodePath.basename(rootDir),
        rootDir,
        1,
        '',
        {maxDepth: 1},
        false
      ).join('\n'))
    })

    test('maxDepth2', () => {
      expect(getTree.print(
        nodePath.basename(rootDir),
        rootDir,
        3,
        '',
        {maxDepth: 2},
        true
      ).join('\n'))
    })
})