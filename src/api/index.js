import fetch from "../auth/fetchInterceptor";

const createCancelableRequest = (config) => {
  const controller = new AbortController();
  const response = fetch({
    ...config,
    signal: controller.signal,
  });

  return {
    response,
    cancel: () => controller.abort(),
  };
};


let ApiRequest = {};

//GET API

ApiRequest.getAgentData = (agentId) => {
  return fetch({
    url: `/api/agents/agentlogin/${agentId}`,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};

ApiRequest.getAgentAccountsList = (agentId) => {
  return fetch({
    url: `/api/agents/${agentId}/agents`,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};

ApiRequest.getCustomerList = (agentId, params) => {
  return fetch({
    url: `/api/agents/${agentId}/customersV3${params !== null ? `?${params}` : ``}&page=0&pageSize=300`,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};

ApiRequest.getCustomerRenewalList = (customerId, currentDate, pageNumber=0, pageSize=100) => {
  return createCancelableRequest({
    url: `/api/saving-accounts/RenewalFilterByCustomerId?emiDate=${currentDate}&pageNumber=${pageNumber}&pageSize=${pageSize}&customerId=${customerId}`,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};

ApiRequest.getAccountsDetails = (customerId, currentDate) => {
  return fetch({
    url: `/api/saving-accounts/renewalbydate/${customerId}/${currentDate}`,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
}

ApiRequest.getCustomerTestingList = (pageSize, pageNumber, queryParam = "") => {
  const url = `/api/customers?pageNumber=${pageNumber}&pageSize=${pageSize}${
    queryParam ? `&${queryParam}` : ""
  }`;
  return fetch({
    url,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};

ApiRequest.getCustomerTestingList = (pageSize, pageNumber, queryParam = "") => {
  const url = `/api/customers?pageNumber=${pageNumber}&pageSize=${pageSize}${
    queryParam ? `&${queryParam}` : ""
  }`;
  return fetch({
    url,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};


ApiRequest.getWalletDetails = (agentId) => {
  return fetch({
    url: `/api/wallet/by-agent/${agentId}`,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};

ApiRequest.getWalletTransactions = (agentId) => {
  return fetch({
    url: `/api/wallet/transactionsbyCustomer/${agentId}`,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};

ApiRequest.getWalletTransactionsByDate = (agentId, date) => {
  return fetch({
    url: `/api/wallet/transactionsbyCustomerbyDate/${agentId}?date=${date}`,
    method: "GET",
    headers: {
      "public-request": false,
    },
  });
};

ApiRequest.getAccessToken = (refreshToken) => {
  return fetch({
    url: `/api/agents/refresh-token`,
    method: "POST", // Assuming it's a POST request
    headers: {
      "public-request": true,
    },
    data: {
      refreshToken, // Send the refresh token to get a new access token
    },
  });
};

//POST API

ApiRequest.loginWithPassword = (data) => {
  return fetch({
    url: `/api/agents/login`,
    method: "POST",
    headers: { "public-request": true },
    data,
  });
};

ApiRequest.logout = (refreshToken) => {
  return fetch({
    url: `/api/customers/logoutToken`,
    method: "POST",
    headers: { "public-request": true },
    data: {
      refreshToken, // Send the refresh token to get a new access token
    },
  });
};

ApiRequest.payRDRenewal = (data, agentId) => {
  return fetch({
    url: `/api/saving-account-transactions/renewalcollectionv2/${agentId}`,
    method: "POST",
    headers: { "public-request": false },
    data,
  });
};

ApiRequest.payDDSRenewal = (data, agentId) => {
  return fetch({
    url: `/api/saving-account-transactions/ddsRenewalTransactioncollection/${agentId}`,
    method: "POST",
    headers: { "public-request": false },
    data,
  });
};

// PUT

ApiRequest.resetPassword = (data) => {
  return fetch({
    url: `/api/agents/change-password`,
    method: "PUT",
    headers: {
      "public-request": false,
    },
    data,
  });
};

// PATCH

ApiRequest.verifyKYCProcess = (data, accessToken) => {
  return fetch({
    url: `/client/verify-kyc-process?otp=${data}`,
    method: "PATCH",
    headers: {
      "public-request": false,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

ApiRequest.onDeleteWatchlistbyId = (id, accessToken) => {
  return fetch({
    url: `/watchlist/client/${id}`,
    method: "DELETE",
    headers: {
      "public-request": false,
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default ApiRequest;
