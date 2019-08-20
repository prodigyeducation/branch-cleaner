const deleteBranchThenUpdateMessage = require('./deleteBranchThenUpdateMessage');
const { deleteBranch } = require('./github');
const { feedbackMessageV1, feedbackMessageV2 } = require('./slack/feedbackMessage');

jest.mock('./github');
jest.mock('./slack/feedbackMessage');

describe('deleteBranchThenUpdateMessage', () => {
    const owner = 'TestOwner';
    const repository = 'test-repository';
    const branch = 'test-branch';
    const channel = 'C1234568';
    const message = {
        text: 'This is a test message',
        ts: '1559365200.001100'
    };
    const user = { login: 'U12345678' };

    beforeEach(() => {
        deleteBranch.mockClear();
        feedbackMessageV1.mockClear();
        feedbackMessageV2.mockClear();
    });

    it('deletes branch with owner, repository and branch', async () => {
        // when
        await deleteBranchThenUpdateMessage({ owner, repository, branch, channel, message, user });

        // then
        expect(deleteBranch).toBeCalledTimes(1);
        expect(deleteBranch).toBeCalledWith({ owner, repository, branch });
    });

    it('updates message with result "S" if the branch has been deleted successfully', async () => {
        // when
        await deleteBranchThenUpdateMessage({ owner, repository, branch, channel, message, user });

        // then
        expect(feedbackMessageV2).toBeCalledWith({
            channel,
            message,
            user,
            repository,
            branch,
            result: 'S'
        });
    });

    it('updates message with result "A" if the branch is already deleted', async () => {
        // given
        deleteBranch.mockRejectedValue({
            ...new Error('Test Error'),
            response: { status: 422, data: 'Unprocessable Entity' }
        });

        // when
        await deleteBranchThenUpdateMessage({ owner, repository, branch, channel, message, user });

        // then
        expect(feedbackMessageV2).toBeCalledWith({
            channel,
            message,
            user,
            repository,
            branch,
            result: 'A'
        });
    });

    it('updates message with result "F" if an unexpected error occurs', async () => {
        // given
        deleteBranch.mockRejectedValue({
            ...new Error('Test Error'),
            response: { status: 500, data: 'Internal Server Error' }
        });

        // when
        await deleteBranchThenUpdateMessage({ owner, repository, branch, channel, message, user });

        // then
        expect(feedbackMessageV2).toBeCalledWith({
            channel,
            message,
            user,
            repository,
            branch,
            result: 'F'
        });
    });

    it('post a new message for feedback instead of updating the existing one if the message is old', async () => {
        message.ts = '1550000000.001100';

        // when
        await deleteBranchThenUpdateMessage({ owner, repository, branch, channel, message, user });

        // then
        expect(feedbackMessageV1).toBeCalledTimes(1);
        expect(feedbackMessageV2).not.toBeCalled();
    });
});
