const composeBlocks = require('./composeBlocks');

test('composeBlocks', () => {
    const repository = 'test-repository';
    const branches = [1, 2].map(num => ({
        date: `2019-0${num}-0${num}`,
        name: `test-branch${num}`,
        user: { name: 'Test User' }
    }));

    // when
    const blocks = composeBlocks({ repository, branches });

    expect(blocks).toHaveLength(2);
    blocks.forEach((block, idx) => {
        expect(block.type).toEqual('section');
        expect(block.text.type).toEqual('mrkdwn');
        expect(block.text.text).toMatch(new RegExp(`test-branch${idx + 1}`));
        expect(block.accessory.type).toEqual('button');
        expect(block.accessory.value).toEqual(`${repository}|test-branch${idx + 1}`);
    });
});
