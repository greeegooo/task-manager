import { Test } from '@nestjs/testing';
import { User } from 'src/auth/user.entity';
import { TaskRepository } from "./task.repository";
import { TasksService } from "./tasks.service";

const taskRepositoryMock = () => ({
    getAll: jest.fn()
});

const userMock: User = {
    username: 'TestName',
    password: 'TestPassword',
    tasks: [],
    id: '1'
};

describe('TaskService', () => {

    let taskService: TasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: taskRepositoryMock }
            ],
        }).compile();

        taskService = module.get<TasksService>(TasksService);
        taskRepository = module.get<TaskRepository>(TaskRepository);
    });

    describe('getAll', () => {
        it('returns all tasks from a user', async () => {

            taskRepository.getAll.mockResolvedValue('some');

            const result = await taskService.getAll(null, userMock);

            expect(result).toEqual('some');
        });
    });
});