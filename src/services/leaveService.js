

const KEYS = {
    leaves: 'leaves',
    leaveId: 'leaveId'
}

export const getEmployeeCollection = () => ([
    { id: '1', title: 'Mark' },
    { id: '2', title: 'Alex' },
    { id: '3', title: 'Benard' },
    { id: '4', title: 'Cate' },
])

export const getLeaveTypeCollection = () => ([
    { id: '1', title: 'Maternity Leave' },
    { id: '2', title: 'Study Leave' },
    { id: '3', title: 'Compassionate Leave' },
    { id: '4', title: 'Sick Leave' },
    { id: '5', title: 'Annual Leave' },
])

export function insertLeave(data) {
    let leaves = getAllLeaves();
    data['id'] = generateLeaveId()
    leaves.push(data)
    localStorage.setItem(KEYS.leaves, JSON.stringify(leaves))
}

export function updateLeave(data) {
    let leaves = getAllLeaves();
    let recordIndex = leaves.findIndex(x => x.id == data.id);
    leaves[recordIndex] = { ...data }
    localStorage.setItem(KEYS.leaves, JSON.stringify(leaves));

}

export function generateLeaveId() {
    if (localStorage.getItem(KEYS.leaveId) == null)
        localStorage.setItem(KEYS.leaveId, '0')
    var id = parseInt(localStorage.getItem(KEYS.leaveId))
    localStorage.setItem(KEYS.leaveId, (++id).toString())
    return id;
}

export function getAllLeaves() {
    if (localStorage.getItem(KEYS.leaves) == null)
        localStorage.setItem(KEYS.leaves, JSON.stringify([]))
    let leaves = JSON.parse(localStorage.getItem(KEYS.leaves));
    //map leaveTypeID to Leave title
    let leaveTypes = getLeaveTypeCollection();
    //map leaveRelieverID to Leave Reliever
    let leaveReliever = getEmployeeCollection();
    return leaves.map(x => ({
        ...x,
        leaveType: leaveTypes[x.leaveTypeId - 1].title,
        reliever : leaveReliever[x.relieverId - 1].title
    }))
}